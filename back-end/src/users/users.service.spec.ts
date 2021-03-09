import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(() => {
    service = new UsersService(userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
