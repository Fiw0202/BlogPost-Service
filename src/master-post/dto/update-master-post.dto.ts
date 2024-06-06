import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMasterPostDto } from './create-master-post.dto';

export class UpdateMasterPostDto extends PartialType(CreateMasterPostDto) {
  @ApiProperty({ required: true })
  _id: string;
}
