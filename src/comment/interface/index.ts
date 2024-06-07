import { HttpStatus } from '@nestjs/common';

export interface IRespHTTPMasterComment {
  statusCode: HttpStatus;
  statusText: string;
  result: IRespMasterComment;
}

export interface IRespALLMasterComment {
  statusCode: HttpStatus;
  statusText: string;
  result: IRespMasterComment[];
}

export interface IRespMasterComment {
  _id?: string | unknown;
  postId: string;
  content: string;
  createName: string;
  createDate: Date;
}
