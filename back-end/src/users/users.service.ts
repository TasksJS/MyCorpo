import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(_id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async getUserByUsername(_username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ username: _username }],
    });
  }

  async createUser(userDto: CreateUserDto) {
    if (
      await this.usersRepository.findOne({
        where: { username: userDto.username },
      })
    ) {
      throw new ConflictException('');
    }

    const salt = bcrypt.genSaltSync(configuration().bcrypt_rounds);
    userDto.password = bcrypt.hashSync(userDto.password, salt);

    const user = await this.usersRepository.create(userDto);
    await this.usersRepository.save(user);
  }

  async updateUser(userId: number, userDto: CreateUserDto) {
    const user = await this.getUserById(userId);

    if (
      await this.usersRepository.findOne({
        where: { username: userDto.username },
      })
    ) {
      throw new ConflictException('');
    }

    user.username = userDto.username || user.username;

    const salt = bcrypt.genSaltSync(configuration().bcrypt_rounds);
    user.password = bcrypt.hashSync(userDto.password, salt) || user.password;

    await this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    await this.usersRepository.delete(user);
  }
}
