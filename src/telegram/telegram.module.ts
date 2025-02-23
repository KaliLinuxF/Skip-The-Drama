import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TranscriptionModule } from '../transcription/transcription.module';
import { SummarizationModule } from 'src/summarization/summarization.module';

@Module({
	imports: [TranscriptionModule, SummarizationModule],
	providers: [TelegramService],
})
export class TelegramModule {}
