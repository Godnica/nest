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
  SetMetadata,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  //@SetMetadata('isPublic', true)  => QUesto non è il best pratica creo un decoratori custom
  @Public()
  @Get()
  findAll(@Protocol() protocol: string,  @Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    console.log(protocol)
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    const coffe = this.coffeesService.findOne(''+id);
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