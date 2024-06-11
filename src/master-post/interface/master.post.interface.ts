import { HttpStatus } from '@nestjs/common';

export interface IRespHTTPMasterPost {
  statusCode: HttpStatus;
  statusText: string;
  result: IRespMasterPost | string;
}

export interface IRespALLMasterPost {
  statusCode: HttpStatus;
  statusText: string;
  result: IRespMasterPost[];
}

export interface IRespMasterPost {
  _id?: string | unknown;
  userId: string;
  subject: string;
  content: string;
  groupPost: string;
  createName: string;
  createDate: Date;
}
