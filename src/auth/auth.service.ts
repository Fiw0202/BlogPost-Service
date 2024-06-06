import { HttpStatus, Injectable } from '@nestjs/common';
import { ReqAuthDto, ReqAuthMeDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, userDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(user.name) private userModel: Model<userDocument>) {}
  async create(req: ReqAuthDto) {
    try {
      const user = await this.userModel.findOne({ userName: req.userName });
      if (user) {
        const resp = {
          statusCode: HttpStatus.OK,
          statusText: HttpStatus[HttpStatus.OK],
          result: {
            userId: user._id,
            token: 'LoginSuccessJWTTokenIsComingSoonPleaseUseThisAsToken',
          },
        };
        return resp;
      } else {
        const resp = {
          statusCode: HttpStatus.UNAUTHORIZED,
          statusText: HttpStatus[HttpStatus.UNAUTHORIZED],
          result: 'Username Not Found',
        };
        return resp;
      }
    } catch (error) {
      throw error;
    }
  }

  async me(req: ReqAuthMeDto) {
    try {
      const user = await this.userModel.findById(req._id);
      const token: boolean =
        req.token === 'LoginSuccessJWTTokenIsComingSoonPleaseUseThisAsToken';
      if (user && token) {
        const resp = {
          statusCode: HttpStatus.OK,
          statusText: HttpStatus[HttpStatus.OK],
          result: user,
        };
        return resp;
      } else {
        const resp = {
          statusCode: HttpStatus.UNAUTHORIZED,
          statusText: HttpStatus[HttpStatus.UNAUTHORIZED],
        };
        return resp;
      }
    } catch (error) {
      throw error;
    }
  }
}
