import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  _id: Types.ObjectId;

  @Prop({ isRequired: true })
  firebaseUid: string;

  @Prop({ unique: true, isRequired: true })
  username: string;

  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  email: string;

  @Prop({ isRequired: false })
  picture?: string;

  @Prop({ isRequired: false })
  bio?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts?: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
