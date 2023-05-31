import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { Comment } from 'src/comments/schemas/comment.schema';

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
    return await createdPost.save();
  }

  async findAll(userId?: string): Promise<Post[]> {
    return await this._postModel
      .find(userId ? { user: userId } : {})
      .sort({ date: -1 })
      .populate(['user', 'likes'])
      .exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this._postModel
      .findById(id)
      .populate(['user', 'likes'])
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this._postModel.findByIdAndDelete(id).exec();
  }

  async toogleLike(id: string, userFirebaseUid: string): Promise<Post> {
    const user = await this._usersService.findOneByFirebaseUid(userFirebaseUid);
    const post = await this._postModel
      .findById(id)
      .populate(['user', 'likes'])
      .exec();
    if (post.likes.find((like) => like._id.equals(user._id))) {
      post.likes = post.likes.filter((like) => !like._id.equals(user._id));
    } else {
      post.likes.push(user);
    }
    return await post.save();
  }
}
