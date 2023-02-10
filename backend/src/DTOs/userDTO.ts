import { IsArray, IsBoolean, IsEmail, IsString } from 'class-validator';

export class CredentialsUserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsBoolean()
  public onboarded?: boolean;
}
