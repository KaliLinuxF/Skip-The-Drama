import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { TranscriptionModule } from './transcription/transcription.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TelegramModule,
		TranscriptionModule,
	],
})
export class AppModule {}
