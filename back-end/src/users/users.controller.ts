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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return (await this.usersService.getUsers()).map((u) => {
      const { password, ...user } = u;
      return user;
    });
  }

  @Get(':id')
  get(@Param() params) {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  update(@Request() req, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  deleteUser(@Request() req) {
    return this.usersService.deleteUser(req.user.id);
  }
}
