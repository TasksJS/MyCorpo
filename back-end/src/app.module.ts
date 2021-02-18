import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evenement } from './models/evenement.entity';
import { EvenementModule } from './evenement/evenement.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { User } from './models/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.user,
      password: configuration().database.password,
      database: configuration().database.database,
      entities: [Evenement, User],
      synchronize: true,
    }),
      UsersModule,
      AuthModule,
      EvenementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
