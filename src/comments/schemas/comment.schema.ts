import mongoose, { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from "src/users/schemas/user.schema";
import { Post } from "src/posts/schemas/post.schema";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);