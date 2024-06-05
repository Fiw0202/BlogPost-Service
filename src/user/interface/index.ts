import { HttpStatus } from '@nestjs/common';

export interface IRespCreateUser {
  statusCode: HttpStatus;
  statusText: string;
  result: IRespUser;
}

export interface IRespUser {
  _id?: string | unknown;
  firstName: string;
  lastName: string;
  displayName: string;
}
