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

    //返回文件信息
    response.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
