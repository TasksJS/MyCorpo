import { Module } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { EvenementController } from './evenement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evenement } from '../models/evenement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evenement])],
  controllers: [EvenementController],
  providers: [EvenementService],
})
export class EvenementModule {}
