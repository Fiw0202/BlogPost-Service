import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRespMasterComment } from '../interface';

export type masterCommentDocument = masterComment & Document;
@Schema({ collection: 'commentPost' })
export class masterComment implements IRespMasterComment {
  @Prop({ required: true })
  postId: string;

  @Prop()
  content: string;

  @Prop()
  createName: string;

  @Prop()
  createDate: Date;
}

export const masterCommentSchema = SchemaFactory.createForClass(masterComment);
