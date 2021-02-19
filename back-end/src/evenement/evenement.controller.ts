import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';
import { Evenement } from '../models/evenement.entity';

@Controller('evenement')
export class EvenementController {
  constructor(private readonly evenementService: EvenementService) {}

  @Post()
  create(@Body() createEvenementDto: CreateEvenementDto) {
    return this.evenementService.createEvenement(createEvenementDto);
  }

  @Get()
  findAll() {
    return this.evenementService.getEvenements();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evenementService.getEvenementById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvenementDto: UpdateEvenementDto,
  ) {
    return this.evenementService.updateEvenement(+id, updateEvenementDto);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.evenementService.deleteEvenement(params.id);
  }
}
