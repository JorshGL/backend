import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly _commentModel: Model<Comment>,
    private readonly _usersService: UsersService,
    private readonly _postsService: PostsService,
  ) {}

  async create(comment: CreateCommentDTO, postId: string, userFirebaseUid: string): Promise<Comment> {
    const user = await this._usersService.findOneByFirebaseUid(userFirebaseUid);
    const post = await this._postsService.findOne(postId);
    console.log(post)
    const newComment = new this._commentModel({
      ...comment,
      user,
      post,
      date: new Date().toISOString(),
    });
    const createdComment = await newComment.save();
    return createdComment;
  }

  async findAllByPostId(postId: string): Promise<Comment[]> {
    return await this._commentModel.find({ post: postId }).populate(['user']).exec();
  }
}
