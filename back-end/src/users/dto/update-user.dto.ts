import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
