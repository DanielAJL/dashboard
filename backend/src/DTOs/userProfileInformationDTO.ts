import { IsArray, IsString } from 'class-validator';

export class UserProfileInformationDTO {
  @IsString()
  public name: string;

  @IsString()
  public expertiseArea?: string;

  @IsString()
  public githubUsername?: string;

  @IsArray()
  public languages?: Array<string>;

  @IsString()
  public experienceYears?: string;
}
