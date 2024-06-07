import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAllComment() {
    return this.commentService.getAllComment();
  }

  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Get('post/:id')
  getCommentByPostId(@Param('id') id: string) {
    return this.commentService.getCommentByPostId(id);
  }

  @Post()
  createPost(@Body() req: CreateCommentDto) {
    return this.commentService.createPost(req);
  }
}
