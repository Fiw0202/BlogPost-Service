import { Module } from '@nestjs/common';
import { MasterPostService } from './master-post.service';
import { MasterPostController } from './master-post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { masterPost, masterPostSchema } from './schema/master.post.schema';
import { user, userSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: masterPost.name, schema: masterPostSchema },
      { name: user.name, schema: userSchema },
    ]),
  ],
  controllers: [MasterPostController],
  providers: [MasterPostService],
})
export class MasterPostModule {}
