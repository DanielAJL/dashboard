import { IsArray, IsBoolean, IsEmail, IsObject, IsString } from 'class-validator';
import { UserProfileInformationDTO } from './userProfileInformationDTO';

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

  @IsObject()
  public profile?: UserProfileInformationDTO;
}
