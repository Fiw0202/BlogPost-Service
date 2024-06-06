import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MasterPostModule } from './master-post/master-post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fiw0202:ofsnl1qQLv1g6wV0@blogpostcluster.yabjhhf.mongodb.net/BlogPostDB',
    ),
    AuthModule,
    UserModule,
    MasterPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
