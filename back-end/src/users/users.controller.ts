import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Working
  @Delete(':id')
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }
  @Get(':id')
  get(@Param() params) {
    return this.usersService.getUserById(params.id);
  }
  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, user);
  }
}
