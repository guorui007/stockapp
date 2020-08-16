import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import { createfile, findFilebyId } from '../file/file.service';

/**
 * 定义上传文件处理器
 */

/**
 * 上传文件处理器
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('客户端文件信息:', request.file);

  //获取当前用户
  const { id: userid } = request.user;

  //获取当前内容id
  const { post: postid } = request.query;

  //文件信息
  const fileinfo = _.pick(request.file, [
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);

  try {
    //保存文件信息
    const data = await createfile({
      ...fileinfo,
      postid: parseInt(`${postid}`, 10),
      userid,
      ...request.filemetadata,
    });
    //做出响应
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 定义文件服务接口
 */

export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取文件查询id
  console.log(request.params);
  const { fileid } = request.params;

  //处理文件查询信息

  try {
    const file = await findFilebyId(parseInt(fileid, 10));

    //获取要提供图像的尺寸
    const { size } = request.query;

    //定义文件名与目录
    let filename = file.filename;
    let root = 'uploads';
    let resized = 'resized';

    //判断是否符合查询条件

    if (size) {
      const imagesizes = ['large', 'medium', 'thumbnail'];

      //检查请求的文件尺寸是否符合要求
      if (!imagesizes.some(item => item == size)) {
        throw new Error('FILE_NOT_FIND');
      }
    }

    //如果size符合要求，检查对应的文件是否存在

    const fileexist = fs.existsSync(
      path.join(root, resized, `${filename}-${size}`),
    );

    //根据情况 重新定义文件名称
    if (fileexist) {
      filename = `${filename}-${size}`;
      root = path.join(root, resized);
    }

    //返回文件信息
    response.sendFile(filename, {
      root,
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 获取文件信息
 */

export const metadata = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取查询的文件id
  const { fileid } = request.params;

  //返回获取的数据信息

  try {
    const file = await findFilebyId(parseInt(fileid, 10));
    const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']);
    console.log(data);
    response.send(data);
  } catch (error) {
    next(error);
  }
};
