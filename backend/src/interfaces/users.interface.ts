import { UserProfileInformationDTO } from '@/DTOs/userProfileInformationDTO';

export interface User {
  _id: string;
  email: string;
  password: string;
  onboarded: boolean;
  profile: UserProfileInformationDTO;
}
