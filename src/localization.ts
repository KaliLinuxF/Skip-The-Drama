export type LocalizedMessages = {
	unauthorized: string;
	processing: string;
	processingCompleted: string;
	showTranscript: string;
	showSummary: string;
	transcriptHeader: string;
	summaryHeader: string;
	transcriptNotFound: string;
	transcriptionError: string;
	summarizationError: string;
	processingSummary: string;
};

export const messages: { [key: string]: LocalizedMessages } = {
	en: {
		unauthorized: '🚫 You are not authorized to use the bot.',
		processing: '⏳ Processing your voice message, please wait...',
		processingSummary: '⏳ Generating summary, please wait...',
		processingCompleted: '✅ Processing complete! Choose an option:',
		showTranscript: '📝 Show Transcript',
		showSummary: '📃 Show Summary',
		transcriptHeader: '📄 Transcript:',
		summaryHeader: '📃 Summary:',
		transcriptNotFound: '🚫 Transcript not found or expired.',
		transcriptionError:
			'🚫 An error occurred while processing your voice message.',
		summarizationError:
			'🚫 An error occurred while generating the summary.',
	},
	ru: {
		unauthorized: '🚫 Вы не авторизованы для использования бота.',
		processing: '⏳ Обрабатываю голосовое сообщение, подождите...',
		processingSummary: '⏳ Генерирую сводку, подождите...',
		processingCompleted: '✅ Обработка завершена! Выберите опцию:',
		showTranscript: '📝 Показать транскрипцию',
		showSummary: '📃 Показать сводку',
		transcriptHeader: '📄 Транскрипция:',
		summaryHeader: '📃 Сводка:',
		transcriptNotFound: '🚫 Транскрипция не найдена или устарела.',
		transcriptionError:
			'🚫 Произошла ошибка при обработке голосового сообщения.',
		summarizationError: '🚫 Произошла ошибка при генерации сводки.',
	},
	uk: {
		unauthorized: '🚫 Ви не авторизовані для використання бота.',
		processing: '⏳ Обробляю голосове повідомлення, зачекайте...',
		processingSummary: '⏳ Генерую підсумок, зачекайте...',
		processingCompleted: '✅ Обробку завершено! Оберіть опцію:',
		showTranscript: '📝 Показати транскрипцію',
		showSummary: '📃 Показати підсумок',
		transcriptHeader: '📄 Транскрипція:',
		summaryHeader: '📃 Підсумок:',
		transcriptNotFound: '🚫 Транскрипція не знайдена або застаріла.',
		transcriptionError:
			'🚫 Сталася помилка при обробці голосового повідомлення.',
		summarizationError: '🚫 Сталася помилка при генерації підсумку.',
	},
};
