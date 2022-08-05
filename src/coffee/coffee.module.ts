import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from 'src/coffees/coffees.constants';


/**@Prod_Dev  quesa roba serve per cambiare il comportamento dell'app a seconda di dev o prod*/
// class ConfigService {}
// class DevelopmentConfigService{}
// class ProductionConfigService{}

@Injectable()
export class CoffeeBrandsFactory{
    create(){
        return ['pene', 'drago']
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],  //Aggiungere sempre nel modulo quello che si vuole aggiungere
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        // {
        //     provide: ConfigService,
        //     useValue: process.env.NODE_ENV ==='development' ? DevelopmentConfigService: ProductionConfigService
        // },
        {
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory:CoffeeBrandsFactory)=> brandsFactory.create(),
            //Oppure 
            //useFactory: async (connection: Connection): Promise<string[]>=>{
            //   const coffeeBrands = await Promise.resolve(['ano', 'vagina']);
            //   return coffeeBrands;
            //}
            inject: [CoffeeBrandsFactory]
        },
        // {
        //     provide: COFFEE_BRANDS,
        //     useValue: ['Nescafe', 'Lavazza']
        // }
    ],
    exports: [CoffeesService]
})
export class CoffeeModule {}
