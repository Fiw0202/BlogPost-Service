import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {
  masterPost,
  masterPostSchema,
} from 'src/master-post/schema/master.post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  masterComment,
  masterCommentSchema,
} from './schema/master.comment.schema';
import { user, userSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: masterComment.name, schema: masterCommentSchema },
      { name: masterPost.name, schema: masterPostSchema },
      { name: user.name, schema: userSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
