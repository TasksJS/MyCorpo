import { Injectable } from '@nestjs/common';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';

@Injectable()
export class EvenementService {
  create(createEvenementDto: CreateEvenementDto) {
    return 'This action adds a new evenement';
  }

  findAll() {
    return `This action returns all evenement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evenement`;
  }

  update(id: number, updateEvenementDto: UpdateEvenementDto) {
    return `This action updates a #${id} evenement`;
  }

  remove(id: number) {
    return `This action removes a #${id} evenement`;
  }
}
