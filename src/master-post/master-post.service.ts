import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMasterPostDto } from './dto/create-master-post.dto';
import { UpdateMasterPostDto } from './dto/update-master-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { masterPost, masterPostDocument } from './schema/master.post.schema';
import { Model } from 'mongoose';
import {
  IRespALLMasterPost,
  IRespHTTPMasterPost,
  IRespMasterPost,
} from './interface/master.post.interface';
import { user, userDocument } from 'src/user/schema/user.schema';

@Injectable()
export class MasterPostService {
  constructor(
    @InjectModel(masterPost.name)
    private masterPostModel: Model<masterPostDocument>,
    @InjectModel(user.name) private userModel: Model<userDocument>,
  ) {}

  async getAllPost() {
    try {
      const data: IRespMasterPost[] = await this.masterPostModel.find();
      const resp: IRespALLMasterPost = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: data,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async getPostById(id: string) {
    try {
      const data = await this.masterPostModel.findById(id);
      const response: IRespMasterPost = await data.save();
      const resp: IRespHTTPMasterPost = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: response,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async createPost(req: CreateMasterPostDto) {
    try {
      const user = await this.userModel.findById(req.userId);
      const data = new this.masterPostModel(req);

      data.createName = user.displayName;
      data.createDate = new Date();
      const response: IRespMasterPost = await data.save();
      const resp: IRespHTTPMasterPost = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: response,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(req: UpdateMasterPostDto) {
    try {
      const data = await this.masterPostModel.findById(req._id);
      data.subject = req.subject;
      data.content = req.content;
      data.groupPost = req.groupPost;
      const response: IRespMasterPost = await data.save();
      const resp: IRespHTTPMasterPost = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: response,
      };
      return resp;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} masterPost`;
  }
}
