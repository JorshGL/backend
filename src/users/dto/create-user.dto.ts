import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty()
  firebaseUid: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  picture: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  bio: string;
}