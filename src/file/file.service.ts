import path from 'path';
import Jimp from 'jimp';

import { connection } from '../app/datbase/mysql';

import { FileModel } from '../file/file.model';

/**
 * 存储文件信息
 */

export const createfile = async (file: FileModel) => {
  //定义插入指令
  const statement = `insert into file set ?`;

  //执行
  const [data] = await connection.promise().query(statement, file);
  console.log(data);
  return data;
};

/**
 * 按照ID直接查找文件
 */

export const findFilebyId = async (fileid: number) => {
  //定义查询文件的指令
  const statement = `select * from file where id = ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, fileid);

  //提供数据
  console.log('文件信息数据:' + data);
  return data[0];
};

/**
 * 调整图像尺寸
 */

export const imageResizer = async (image: Jimp, file: Express.Multer.File) => {
  //获取图像尺寸
  const { imageSize } = image['_exif'];

  //定义新的文件存储路径
  const filepath = path.join(file.destination, 'resized', file.filename);

  //应用字符模板 时候注意  用的是 双斜号码
  //大尺寸调整
  if (imageSize.width > 1280) {
    image
      .resize(1280, Jimp.AUTO)
      .quality(85)
      .write(`${filepath}-large`);
  }

  //中等尺寸写入
  if (imageSize.width > 640) {
    image
      .resize(640, Jimp.AUTO)
      .quality(85)
      .write(`${filepath}-medium`);
  }

  //小尺寸写入
  if (imageSize.width > 320) {
    image
      .resize(320, Jimp.AUTO)
      .quality(85)
      .write(`${filepath}-thumbnail`);
  }
};
