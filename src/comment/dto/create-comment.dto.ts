import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  postId: string;

  @ApiProperty()
  content: string;
}
