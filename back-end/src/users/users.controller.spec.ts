import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    controller = new UsersController(userService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
