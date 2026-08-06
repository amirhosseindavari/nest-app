import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: process.env.DB_CONNECTION as 'mysql',
        database: process.env.DB_NAME ?? '',
        username: process.env.DB_USERNAME ?? '',
        password: process.env.DB_PASSWORD ?? '',
        port: Number(process.env.DB_PORT) ?? 0,
        host: process.env.DB_HOST ?? '',
        synchronize: process.env.DEBUG_MODE === 'true',
        entities: [User]
      }),
      
    }),
    SmsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
