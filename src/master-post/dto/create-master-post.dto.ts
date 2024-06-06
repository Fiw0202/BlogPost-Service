import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterPostDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  groupPost: string;
}
