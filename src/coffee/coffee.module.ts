import { Module } from '@nestjs/common';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor])],  //Aggiungere sempre nel modulo quello che si vuole aggiungere
    controllers: [CoffeesController],
    providers: [CoffeesService],
})
export class CoffeeModule {}
