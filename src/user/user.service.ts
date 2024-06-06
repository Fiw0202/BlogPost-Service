import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, userDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { IRespCreateUser, IRespUser } from './interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private userModel: Model<userDocument>) {}

  async getUserById(id: string) {
    try {
      const data = await this.userModel.findById(id).exec();
      const resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: data,
      };
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(req: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ userName: req.userName });
      if (user) {
        return {
          statusCode: HttpStatus.CONFLICT,
          statusText: HttpStatus[HttpStatus.CONFLICT],
          message: `username ${req.userName} ถูกใช้งานเเล้ว`,
        };
      }
      const data = new this.userModel(req);
      data.displayName = `${req.firstName} ${req.lastName}`;
      const response: IRespUser = await data.save();
      const resp: IRespCreateUser = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: response,
      };
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
}
