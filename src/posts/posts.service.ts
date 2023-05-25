import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly _postModel: Model<Post>,
    private readonly _usersService: UsersService,
  ) {}

  async create(post: CreatePostDTO, userFirebaseUid: string): Promise<Post> {
    const user = await this._usersService.findOneByFirebaseUid(userFirebaseUid);
    const createdPost = new this._postModel({
      ...post,
      user,
      date: new Date().toISOString(),
    });
    return createdPost.save();
  }

  async findAll(userId?: string): Promise<Post[]> {
    if (userId) {
      return this._postModel.find({ user: userId }).populate('user').exec();
    }
    return this._postModel.find().populate('user').exec();
  }

  async delete(id: string): Promise<void> {
    await this._postModel.findByIdAndDelete(id).exec();
  }
}
