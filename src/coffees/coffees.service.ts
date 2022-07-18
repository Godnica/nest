import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Cappuccino',
            brand: 'Frothy Coffee',
            flavors: ['vanilla', 'milk', 'almond'],
        }
    ];

    findAll() {
        return this.coffees;
      }
    
      findOne(id: string) {
        return this.coffees.find(item => item.id === +id);
      }
    
      create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto
      }
    
      update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
          //update the existing entity
          this.findOne(id).name = updateCoffeeDto.name;
        }
      }
    
      remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
          this.coffees.splice(coffeeIndex, 1);
        }
      }
}
