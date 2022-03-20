import { extname } from 'path';
import { Express, Request } from 'express';

export const editFileName = (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};