import { HttpStatus } from '@nestjs/common';

export interface IRespCreateUser {
  statusCode: HttpStatus;
  statusText: string;
  result: IRespUser;
}

export interface IRespUser {
  _id?: string | unknown;
  userName: string;
  firstName: string;
  lastName: string;
  displayName: string;
}
