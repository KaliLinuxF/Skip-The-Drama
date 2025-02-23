// summarization/summarization.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SummarizationService {
	private readonly logger = new Logger(SummarizationService.name);
	private readonly summarizationPrompt: string;
	private readonly openaiApiKey: string;
	private readonly language: string;

	constructor(private readonly configService: ConfigService) {
		this.summarizationPrompt =
			this.configService.get<string>('SUMMARIZATION_PROMPT') ||
			'Provide a brief summary of the following text:';

		this.openaiApiKey = this.configService.get<string>(
			'OPENAI_API_KEY',
		) as string;

		if (!this.openaiApiKey) {
			throw new Error('bad OPENAI_API_KEY');
		}

		this.language = this.configService.get<string>('LANGUAGE') || 'eng';
	}

	async summarize(text: string): Promise<string> {
		try {
			const prompt = `${this.summarizationPrompt}\n\n${text}`;

			const response = await axios.post(
				'https://api.openai.com/v1/chat/completions',
				{
					model: 'gpt-4',
					messages: [
						{
							role: 'system',
							content: this.getSystemPromptForLanguage(),
						},
						{
							role: 'user',
							content: prompt,
						},
					],
					max_tokens: 150,
					temperature: 0.7,
				},
				{
					headers: {
						Authorization: `Bearer ${this.openaiApiKey}`,
						'Content-Type': 'application/json',
					},
				},
			);
			return response.data.choices[0].message.content.trim() as string;
		} catch (error) {
			this.logger.error('Ошибка при генерации сводки', error);
			throw error;
		}
	}

	private getSystemPromptForLanguage(): string {
		switch (this.language.toLowerCase()) {
			case 'eng':
			case 'en':
				return 'You are an assistant who always answers in English.';
			case 'ukr':
			case 'ua':
			case 'ukraine':
				return 'You are an assistant who always answers in Ukrainian.';
			case 'ru':
			default:
				return 'You are an assistant who always answers in Russian.';
		}
	}
}
