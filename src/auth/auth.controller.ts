import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqAuthDto, ReqAuthMeDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() req: ReqAuthDto) {
    return this.authService.create(req);
  }

  @Post('/me')
  me(@Body() req: ReqAuthMeDto) {
    return this.authService.me(req);
  }
}
