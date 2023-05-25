import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from 'src/types';

@Injectable()
export class UtilsService {
  async handleError(err: Error): Promise<HttpException> {
    throw new HttpException( {
      success: false,
      message: err.message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async successResponse(data: any): Promise<IResponse> {
    return {
      success: true,
      data,
    };
  }
}
