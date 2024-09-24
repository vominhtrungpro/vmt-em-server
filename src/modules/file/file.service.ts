import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class FileService {
  async readPdf(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    try {
      const data = await pdfParse(file.buffer);
      return data.text;
    } catch (error) {
      throw new Error(`Error parsing PDF: ${error.message}`);
    }
  }
}
