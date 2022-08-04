import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';


@Injectable()
export class CoffeesService {
    constructor(
      @InjectRepository(Coffee)
      private readonly coffeRepository: Repository<Coffee>,
      @InjectRepository(Flavor)
      private readonly flavorRepository: Repository<Flavor>,
      private readonly dataSource : DataSource
    ){

    }

      findAll(paginationQuery:PaginationQueryDto) {

          const {limit, offset} = paginationQuery

          return this.coffeRepository.find({
            relations:{   //relations with flawor, by the way we got the relations with flavortable
              flavors: true
            },
            skip: offset,
            take: limit
          });
        }
      
      async findOne(id: string) {
        const coffee = await this.coffeRepository.findOne({
          where:{
            id: +id
          },
          relations:{
            flavors: true
          }
        })

        if(!coffee){
          throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee
      }
    
      async create(createCoffeeDto: CreateCoffeeDto) {
        //Guarda qui porcoddighel
        const flavors = await Promise.all(
          createCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name))
        );

        const coffee = this.coffeRepository.create({
          ...createCoffeeDto,
          flavors,
        });
        return this.coffeRepository.save(coffee)
      }
    
      async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {

        const flavors = updateCoffeeDto.flavors && 
        (await Promise.all(
          updateCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name))
        ))

        const coffee = await this.coffeRepository.preload({
          id: +id,
          ...updateCoffeeDto,
          flavors,
        });

        if(!coffee){
          throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeRepository.save(coffee);
      }
    
      async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeRepository.remove(coffee);
      }

      //reload flavors by name
      private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({
          where: {
            name: name
          }
        });
        if (existingFlavor) {
          return existingFlavor;
        }
        return this.flavorRepository.create({ name });
      }

      async recommendCoffe(coffee: Coffee){
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect()
        await queryRunner.startTransaction();

        try {
          const recommedEvent = new Event();
          coffee.recommendations++;
          recommedEvent.name = 'recommend_coffee';
          recommedEvent.type = 'coffeee';
          recommedEvent.payload = {
            coffeeId: coffee.id
          }

          await queryRunner.manager.save(coffee);
          await queryRunner.manager.save(recommedEvent);

          await queryRunner.commitTransaction()
        } catch (error) {
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release()
        }

      }
}
