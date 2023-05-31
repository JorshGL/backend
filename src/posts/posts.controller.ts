import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Query,
  Delete,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { UtilsService } from 'src/utils/utils.service';
import { IResponse } from 'src/types';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(
    private readonly _postsService: PostsService,
    private readonly _utilsService: UtilsService,
  ) {}

  @Post('new')
  async create(@Body() post: CreatePostDTO, @Request() req) {
    try {
      const newPost = await this._postsService.create(post, req.user.uid);
      return await this._utilsService.successResponse(newPost);
    } catch (err) {
      return this._utilsService.handleError(err);
    }
  }

  @Get('all')
  async findAll(@Query('userId') userId?: string) {
    try {
      const posts = await this._postsService.findAll(userId);
      return await this._utilsService.successResponse(posts);
    } catch (err) {
      return this._utilsService.handleError(err);
    }
  }

  @Get('one/:id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this._postsService.findOne(id);
      return await this._utilsService.successResponse(post);
    } catch (err) {
      return this._utilsService.handleError(err);
    }
  }

  @Delete('delete')
  async delete(@Query('id') id: string) {
    try {
      const deletedPost = await this._postsService.delete(id);
      return await this._utilsService.successResponse(deletedPost);
    } catch (err) {
      return this._utilsService.handleError(err);
    }
  }

  @Put('like/:postId')
  async toggleLike(@Req() req, @Param('postId') postId: string) {
    try {
      const post = await this._postsService.toogleLike(postId, req.user.uid);
      return await this._utilsService.successResponse(post);
    } catch (err) {
      return this._utilsService.handleError(err);
    }
  }
}
