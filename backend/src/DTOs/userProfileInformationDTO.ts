import { IsString } from 'class-validator';

export class UserProfileInformationDTO {
  @IsString()
  public name: string;

  @IsString()
  public expertiseArea?: string;

  @IsString()
  public githubUsername?: string;
}
