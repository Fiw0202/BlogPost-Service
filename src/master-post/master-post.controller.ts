import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterPostService } from './master-post.service';
import { CreateMasterPostDto } from './dto/create-master-post.dto';
import { UpdateMasterPostDto } from './dto/update-master-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('master post')
@Controller('master-post')
export class MasterPostController {
  constructor(private readonly masterPostService: MasterPostService) {}

  @Get()
  getAllPost() {
    return this.masterPostService.getAllPost();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterPostService.getPostById(id);
  }

  @Post()
  createPost(@Body() req: CreateMasterPostDto) {
    return this.masterPostService.createPost(req);
  }

  @Patch()
  update(@Body() req: UpdateMasterPostDto) {
    return this.masterPostService.updatePost(req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterPostService.remove(+id);
  }
}
