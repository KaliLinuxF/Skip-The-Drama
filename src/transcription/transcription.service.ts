import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class TranscriptionService {
	private readonly logger = new Logger(TranscriptionService.name);

	async transcribe(fileUrl: string): Promise<string> {
		try {
			const fileResponse = await axios.get(fileUrl, {
				responseType: 'stream',
			});

			const formData = new FormData();

			formData.append('file', fileResponse.data, {
				filename: 'voice.ogg',
			});

			formData.append('model', 'whisper-1');

			const apiKey = process.env.OPENAI_API_KEY;

			if (!apiKey) {
				throw new Error('bad OPENAI_API_KEY');
			}

			const whisperResponse = await axios.post(
				'https://api.openai.com/v1/audio/transcriptions',
				formData,
				{
					headers: {
						...formData.getHeaders(),
						Authorization: `Bearer ${apiKey}`,
					},
				},
			);

			// Возвращаем текст транскрипции
			return whisperResponse.data.text as string;
		} catch (error) {
			this.logger.error('Error during transcription: ', error);
			throw error;
		}
	}
}
