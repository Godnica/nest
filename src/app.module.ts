import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from "./coffee/coffee.module"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeeModule,
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
    }
  ),
    CommonModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide : APP_PIPE,
    //   useClass: ValidationPipe        ----> Nel caso volessi utilizzare globalmente un PIPE
    // }
  ],
})
export class AppModule {}
