import path from 'path';
import Jimp from 'jimp';
import { Request, Response, NextFunction } from 'express';

//multer 是express 官方推荐的文件上传中间件
//multer 在request对象中 加入了body和file或files属性
//file或files包含了form中的附件数据
import multer from 'multer';
import { fileFilter } from '../file/file.middleware';

/**
 * 创建一个文件上传中间件
 */

const avatarupload = multer({
  dest: 'uploads/avatar',
  fileFilter: fileFilter,
});
/**
 * 文件拦截器
 */
//multer.single(filename),接受一个叫做filename名字的附件，该附件将被保存到request.file属性中
//multer.array(fieldname[,maxCount]) 接受一个名字叫fieldname的附件数组
export const avatarInterceptor = avatarupload.single('avatar');
//export const avatarInterceptor = avatarupload.single('avatar');

/**
 * 创建图像尺寸处理中间件
 */

export const avatarProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //解构multer中间件附加到req上的file属性，获取destination,filename,path等属性
  const { file } = request;

  //定义不同尺寸文件路径
  const avatarpath = await path.join(
    file.destination,
    'resized',
    file.filename,
  );

  //处理文件
  try {
    //读取文件
    const image = await Jimp.read(file.path);

    image
      .cover(256, 256)
      .quality(85)
      .write(`${avatarpath}-large`);
    image
      .cover(256, 256)
      .quality(85)
      .write(`${avatarpath}-medium`);
    image
      .cover(64, 64)
      .quality(85)
      .write(`${avatarpath}-small`);
  } catch (error) {
    return next(error);
  }

  //下一步
  next();
};
