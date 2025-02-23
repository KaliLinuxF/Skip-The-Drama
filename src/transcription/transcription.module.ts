import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';

@Module({
	providers: [TranscriptionService],
	exports: [TranscriptionService],
})
export class TranscriptionModule {}
