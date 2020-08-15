import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 定义文件拦截器
 */

export const fileInterceptor = fileUpload.single('file');
