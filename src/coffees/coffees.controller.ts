import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffe = this.coffeesService.findOne(id);
    if (!coffe) {
        //throw new HttpException(`Coffee with id ${id} not found`, HttpStatus.NOT_FOUND);   
        throw new NotFoundException(`Coffe ${id}, non trovato`) // Scritto molto più figo
    }
    return coffe;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updpateCoffeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updpateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}