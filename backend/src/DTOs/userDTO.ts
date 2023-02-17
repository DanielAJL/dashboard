import { IsArray, IsBoolean, IsEmail, IsMongoId, IsNumber, isNumber, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { UserProfileInformationDTO } from './userProfileInformationDTO';

export class CredentialsUserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UserDTO {

  @IsMongoId()
  public _id: ObjectId;

  @IsNumber()
  public __v: number;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsBoolean()
  public onboarded?: boolean;

  @IsObject()
  public profile?: UserProfileInformationDTO;
}
