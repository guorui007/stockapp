import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';
import { request } from 'http';

/**
 * 文件过滤器
 */

export const fileFilter = async (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  //测试文件类型
  const filetypes = ['image/png', 'image/jpg', 'image/jpeg'];
  const allowed = filetypes.some(type => type === file.mimetype);

  if (allowed) {
    //调用回调函数  允许上传
    callback(null, true);
  } else {
    callback(new Error('FILE_TYPE_IS_NOT_ALLOWED'));
  }
};

//const fileUploadFilter = fileFilter();

const fileUpload = multer({
  dest: 'uploads/',
  fileFilter: fileFilter,
});

/**
 * 定义文件拦截器
 */

//fileInterceptor
export const fileInterceptor = fileUpload.single('file');

/**
 * 文件处理器
 */

export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取文件路径
  console.log('获取文件信息:' + request.file);
  const { path } = request.file;

  let image: Jimp;

  try {
    //读取图像文件
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }

  //准备文件数据  对于有 下划线的属性名称，采集其值时，需要用 []
  const { imageSize, tags } = image['_exif'];

  //将文件信息数据添加到请求中
  request.filemetadata = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  //调整图像尺寸，并存入文件相关信息
  imageResizer(image, request.file);

  //下一步
  next();
};
