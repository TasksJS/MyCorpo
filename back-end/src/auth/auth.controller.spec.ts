import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    controller = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
