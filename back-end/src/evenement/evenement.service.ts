import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evenement } from '../models/evenement.entity';
import { Repository } from 'typeorm';
import { UpdateEvenementDto } from './dto/update-evenement.dto';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private evenementsRepository: Repository<Evenement>,
  ) {}

  async getEvenements(): Promise<Evenement[]> {
    return await this.evenementsRepository.find();
  }

  async getEvenementById(_id: number): Promise<Evenement> {
    return await this.evenementsRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async updateEvenement(evenementId: number, evenementDto: UpdateEvenementDto) {
    const evenement = await this.getEvenementById(evenementId);

    evenement.name = evenementDto.name || evenement.name;
    evenement.description = evenementDto.description || evenement.description;
    evenement.date = evenementDto.date || evenement.date;
    evenement.isActive = evenementDto.isActive || evenement.isActive;

    await this.evenementsRepository.save(evenement);
  }

  async deleteEvenement(evenement: Evenement) {
    await this.evenementsRepository.delete(evenement);
  }

  async createEvenement(createEvenementDto: CreateEvenementDto) {
    const evenement = await this.evenementsRepository.create(
      createEvenementDto,
    );
    await this.evenementsRepository.save(evenement);
  }
}
