import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from "./coffee/coffee.module"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeeModule,CoffeeModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'asdasdasd111.',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
