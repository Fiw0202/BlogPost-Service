import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  masterComment,
  masterCommentDocument,
} from './schema/master.comment.schema';
import { Model } from 'mongoose';
import {
  masterPost,
  masterPostDocument,
} from 'src/master-post/schema/master.post.schema';
import {
  IRespALLMasterComment,
  IRespHTTPMasterComment,
  IRespMasterComment,
} from './interface';
import { user, userDocument } from 'src/user/schema/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(masterComment.name)
    private masterCommentModel: Model<masterCommentDocument>,
    @InjectModel(masterPost.name) private postModel: Model<masterPostDocument>,
    @InjectModel(user.name) private userModel: Model<userDocument>,
  ) {}

  async getAllComment() {
    try {
      const data: IRespMasterComment[] = await this.masterCommentModel.find();
      const resp: IRespALLMasterComment = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: data,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async getCommentById(id: string) {
    try {
      const data = await this.masterCommentModel.findById(id);
      const resp: IRespHTTPMasterComment = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: data,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async getCommentByPostId(postId: string) {
    try {
      const data: IRespMasterComment[] = await this.masterCommentModel.find({
        postId: postId,
      });
      const resp: IRespALLMasterComment = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: data,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async createPost(req: CreateCommentDto) {
    try {
      const post = await this.postModel.findById(req.postId);
      const user = await this.userModel.findById(req.userId);
      const data = new this.masterCommentModel(req);

      console.log(user);
      data.createName = user.displayName;
      data.createDate = new Date();
      const response: IRespMasterComment = await data.save();
      const resp: IRespHTTPMasterComment = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: response,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
