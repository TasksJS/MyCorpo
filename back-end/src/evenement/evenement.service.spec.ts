import { Test, TestingModule } from '@nestjs/testing';
import { EvenementService } from './evenement.service';
import { Repository } from 'typeorm';
import { Evenement } from '../models/evenement.entity';

describe('EvenementService', () => {
  let service: EvenementService;
  let eventRepository: Repository<Evenement>;

  beforeEach(() => {
    service = new EvenementService(eventRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
