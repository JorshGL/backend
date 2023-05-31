import mongoose, { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from "src/users/schemas/user.schema";
import { Comment } from "src/comments/schemas/comment.schema";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  photo: string;

  @Prop()
  title: string;

  @Prop()
  date: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
  likes: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);