import mongoose, { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from "src/users/schemas/user.schema";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  photo: string;

  @Prop()
  date: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);