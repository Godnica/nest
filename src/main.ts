import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Questo fa in modo che vengono considerati solamente i valori che servono nelle chiamate quando passo un modello
    // Esempio: passo {name: ciccio, proprieta_non_riconosciuta: true}, considera solo {name: ciccio} secondo il modello
    forbidNonWhitelisted: true,  //Se passo proprietà non contemplate restituisco errore
    transform: true, // trasforma il paylod delle richieste nella primitiva
    transformOptions:{
      enableImplicitConversion: true //Ci consente di evitare il type come quello che è nella pagination-query-dto
    }

  }));  // => si dichiara che tipo di validatori utilizzerà l'app npm i class-validator class-transformer
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalGuards(new ApiKeyGuard())   // => questo non lo possiamo più usare perchè dipende da reflector e config service ora
  app.useGlobalInterceptors(new WrapResponseInterceptor())
  await app.listen(3000);
}
bootstrap();
