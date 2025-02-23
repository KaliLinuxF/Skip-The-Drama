import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SummarizationService } from './summarization.service';

@Module({
	imports: [ConfigModule],
	providers: [SummarizationService],
	exports: [SummarizationService],
})
export class SummarizationModule {}
