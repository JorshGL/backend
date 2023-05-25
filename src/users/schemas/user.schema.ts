import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firebaseUid: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  picture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
