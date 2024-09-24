import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('content')
  @UseInterceptors(FileInterceptor('file'))
  async readPdf(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.fileService.readPdf(file);
  }
}
