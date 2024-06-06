import { ApiProperty } from '@nestjs/swagger';

export class ReqAuthDto {
  @ApiProperty()
  userName: string;
}

export class ReqAuthMeDto {
  @ApiProperty()
  _id: string;
  
  @ApiProperty()
  token: string;
}
