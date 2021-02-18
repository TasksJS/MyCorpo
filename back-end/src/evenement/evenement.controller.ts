import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';

@Controller('evenement')
export class EvenementController {
  constructor(private readonly evenementService: EvenementService) {}

  @Post()
  create(@Body() createEvenementDto: CreateEvenementDto) {
    return this.evenementService.create(createEvenementDto);
  }

  @Get()
  findAll() {
    return this.evenementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evenementService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEvenementDto: UpdateEvenementDto) {
    return this.evenementService.update(+id, updateEvenementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evenementService.remove(+id);
  }
}
