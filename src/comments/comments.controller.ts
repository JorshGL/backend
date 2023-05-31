import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UtilsService } from 'src/utils/utils.service';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(
    private readonly _commentsService: CommentsService,
    private readonly _utilsService: UtilsService,
  ) {}

  @Post('new/:postId')
  async create(
    @Body() comment: CreateCommentDTO,
    @Req() req: any,
    @Param('postId') postId: string,
  ) {
    try {
      const commentCreated = await this._commentsService.create(
        comment,
        postId,
        req.user.uid,
      );
      return await this._utilsService.successResponse(commentCreated);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }

  @Get('all/:postId')
  async findAllByPostId(@Param('postId') postId: string) {
    try {
      const comments = await this._commentsService.findAllByPostId(postId);
      return await this._utilsService.successResponse(comments);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }
}
