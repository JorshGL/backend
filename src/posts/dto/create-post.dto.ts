import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePostDTO {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  desc: string;

  @IsNotEmpty()
  photo: string;
}