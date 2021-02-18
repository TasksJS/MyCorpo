import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(_id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async updateUser(userId: number, userDto: CreateUserDto) {
    const user = await this.getUserById(userId);

    if (
      await this.usersRepository.find({ where: { username: userDto.username } })
    ) {
      throw new ConflictException('');
    }

    user.username = userDto.username || user.username;
    user.password = userDto.password || user.password;

    await this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    await this.usersRepository.delete(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    if (
      await this.usersRepository.findOne({
        where: { username: createUserDto.username },
      })
    ) {
      throw new ConflictException('');
    }
    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
  }
}
