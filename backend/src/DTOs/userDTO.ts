import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
