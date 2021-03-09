import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(() => {
    service = new AuthService(userService, jwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
