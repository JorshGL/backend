import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePostDTO {
  @IsNotEmpty()
  photo: string;

  @IsOptional()
  title?: string;
}