import { UserProfileInformationDTO } from "./UserProfileInformationDTO";

export class UserDTO {
  _id?: string;
  password?: string;
  email?: string;
  onboarded?: boolean;
  profile?: UserProfileInformationDTO;
}
