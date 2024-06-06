import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRespMasterPost } from '../interface/master.post.interface';

export type masterPostDocument = masterPost & Document;
@Schema({ collection: 'masterPost' })
export class masterPost implements IRespMasterPost {
  @Prop({ required: true })
  userId: string;

  @Prop()
  subject: string;

  @Prop()
  content: string;

  @Prop()
  groupPost: string;

  @Prop()
  createName: string;

  @Prop()
  createDate: Date;
}

export const masterPostSchema = SchemaFactory.createForClass(masterPost);
