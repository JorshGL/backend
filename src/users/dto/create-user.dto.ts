import { IsNotEmpty } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty()
  firebaseUid: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  picture: string;
}