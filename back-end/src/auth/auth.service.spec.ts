import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let app: INestApplication;

  /*  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });*/

  beforeEach(() => {
    authService = new AuthService(userService, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  /*  it('Should be log', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'test', password: 'azerty' })
      .expect(200)
      .end(function (err, res) {
        if (err) return err;
        return;
      });
  });*/
});
