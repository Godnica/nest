import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Questo fa in modo che vengono considerati solamente i valori che servono nelle chiamate quando passo un modello
    // Esempio: passo {name: ciccio, proprieta_non_riconosciuta: true}, considera solo {name: ciccio} secondo il modello
    forbidNonWhitelisted: true,  //Se passo proprietà non contemplate restituisco errore
    transform: true, // trasforma il paylod delle richieste nella primitiva

  }));  // => si dichiara che tipo di validatori utilizzerà l'app npm i class-validator class-transformer
  await app.listen(3000);
}
bootstrap();
