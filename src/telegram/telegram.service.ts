import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { message } from 'telegraf/filters';
import { ConfigService } from '@nestjs/config';
import { TranscriptionService } from '../transcription/transcription.service';
import { SummarizationService } from '../summarization/summarization.service';
import { LocalizedMessages, messages } from '../localization';

@Injectable()
export class TelegramService implements OnModuleInit {
	private readonly logger = new Logger(TelegramService.name);
	private bot: Telegraf<Context>;
	private transcriptionCache: Map<string, string> = new Map();
	private authorizedUsers: number[] = [];
	private localization: LocalizedMessages;

	constructor(
		private readonly configService: ConfigService,
		private readonly transcriptionService: TranscriptionService,
		private readonly summarizationService: SummarizationService,
	) {
		const botToken =
			this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
		const authUsersConfig =
			this.configService.get<string>('AUTHORIZED_USERS') || '';
		const localizationKey =
			this.configService.get<string>('LOCALIZATION') || 'en';

		this.localization = messages[localizationKey] || messages['en'];

		this.authorizedUsers = authUsersConfig
			.split(',')
			.map((id) => parseInt(id.trim()))
			.filter((id) => !isNaN(id));

		if (!botToken) {
			throw new Error('TELEGRAM_BOT_TOKEN не задан');
		}

		this.bot = new Telegraf(botToken);
	}

	async onModuleInit() {
		this.setupListeners();
		await this.bot.launch();
		this.logger.log('Telegram bot started');
	}

	setupListeners() {
		this.bot.on(message('voice'), async (ctx) => {
			if (!this.authorizedUsers.includes(ctx.message.from.id)) {
				await ctx.reply(this.localization.unauthorized, {
					parse_mode: 'Markdown',
				});
				return;
			}

			try {
				const voice = ctx.message.voice;
				const fileId = voice.file_id;
				const fileLink = await this.bot.telegram.getFileLink(fileId);
				this.logger.log(
					`Received voice message. File URL: ${fileLink.href}`,
				);

				const sentMsg = await ctx.reply(this.localization.processing, {
					parse_mode: 'Markdown',
				});

				const transcription =
					await this.transcriptionService.transcribe(fileLink.href);
				const transcriptId =
					Date.now().toString() +
					Math.random().toString(36).substring(2, 8);
				this.transcriptionCache.set(transcriptId, transcription);

				await this.bot.telegram.editMessageText(
					sentMsg.chat.id,
					sentMsg.message_id,
					undefined,
					this.localization.processingCompleted,
					{
						parse_mode: 'Markdown',
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: this.localization.showTranscript,
										callback_data: `show_transcript:${transcriptId}`,
									},
								],
							],
						},
					},
				);
			} catch (error) {
				this.logger.error('Error processing voice message', error);
				await ctx.reply(this.localization.transcriptionError);
			}
		});

		this.bot.on('callback_query', async (ctx) => {
			if (!('data' in ctx.callbackQuery) || !ctx.callbackQuery.data) {
				return;
			}
			const data = ctx.callbackQuery.data;

			if (data.startsWith('show_transcript:')) {
				const transcriptId = data.replace('show_transcript:', '');
				const transcript = this.transcriptionCache.get(transcriptId);
				await ctx.answerCbQuery();

				if (transcript) {
					await ctx.editMessageText(
						`${this.localization.transcriptHeader}\n\n${transcript}`,
						{
							parse_mode: 'Markdown',
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: this.localization.showSummary,
											callback_data: `show_summary:${transcriptId}`,
										},
									],
								],
							},
						},
					);
				} else {
					await ctx.reply(this.localization.transcriptNotFound);
				}
			} else if (data.startsWith('show_summary:')) {
				const transcriptId = data.replace('show_summary:', '');
				await ctx.answerCbQuery();
				const transcript = this.transcriptionCache.get(transcriptId);

				if (transcript) {
					try {
						await ctx.editMessageText(
							`${this.localization.transcriptHeader}\n\n${transcript}\n\n${this.localization.summaryHeader}\n\n${this.localization.processingSummary}`,
							{ parse_mode: 'Markdown' },
						);

						const summary =
							await this.summarizationService.summarize(
								transcript,
							);

						await ctx.editMessageText(
							`${this.localization.transcriptHeader}\n\n${transcript}\n\n${this.localization.summaryHeader}\n\n${summary}`,
							{ parse_mode: 'Markdown' },
						);
					} catch (error) {
						this.logger.error('Error generating summary', error);
						await ctx.reply(this.localization.summarizationError);
					}
				} else {
					await ctx.reply(this.localization.transcriptNotFound);
				}
			}
		});
	}
}
