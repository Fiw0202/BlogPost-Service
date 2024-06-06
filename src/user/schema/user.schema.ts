import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';
import { IRespUser } from '../interface';

// export type userDocument = HydratedDocument<user>;
export type userDocument = user & Document;
@Schema({ collection: 'users' })
export class user implements IRespUser {
  @Prop()
  userName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  displayName: string;
}

export const userSchema = SchemaFactory.createForClass(user);
