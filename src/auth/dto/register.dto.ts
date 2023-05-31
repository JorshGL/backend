import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  picture: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  bio: string;
}