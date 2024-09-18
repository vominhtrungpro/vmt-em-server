import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

// response.helper.ts
export class ApiResponse {
  static success(
    data: any,
    message: string = 'Request successful',
    statusCode: number = 200,
  ) {
    return {
      statusCode,
      success: true,
      message,
      data,
    };
  }

  static error(
    message: string = 'Request failed',
    statusCode: number = 400,
    errors: any = null,
  ) {
    const response = {
      statusCode,
      success: false,
      message,
      errors,
    };

    throw new BadRequestException(response);
  }

  static internal() {
    throw new InternalServerErrorException();
  }
}
