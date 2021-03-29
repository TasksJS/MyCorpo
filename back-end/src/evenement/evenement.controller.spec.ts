import { Test, TestingModule } from '@nestjs/testing';
import { EvenementController } from './evenement.controller';
import { EvenementService } from './evenement.service';

describe('EvenementController', () => {
  let controller: EvenementController;
  let eventService: EvenementService;

  beforeEach(() => {
    controller = new EvenementController(eventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
