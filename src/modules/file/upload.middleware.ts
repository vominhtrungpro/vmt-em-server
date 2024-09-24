import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const upload = multer().single('file');
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send('Error uploading file');
      }
      next();
    });
  }
}
