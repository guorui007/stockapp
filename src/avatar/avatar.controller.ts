import path from 'path'; //合并文件路径
import fs from 'fs'; //检查文件是否存在

import { Request, Response, NextFunction } from 'express';
import { createAvatar, findAvatarByUserid } from './avatar.service';
import _ from 'lodash'; //_.pick() 方法可以从，对象中采集需要的属性

/**
 * 上传头像
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //从authgurd中间件 获取userid信息
  const { id: userId } = request.user;

  //从req.file解构其它需要的数据
  const filedata = await _.pick(request.file, ['mimetype', 'filename', 'size']);

  const avatardata = {
    ...filedata,
    userId,
  };
  //存储avatar数据

  try {
    const data = await createAvatar(avatardata);
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 根据用户ID和查询的头像尺寸 获得头像
 */

export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取用户ID
  const { userid } = request.params;

  //根据用户ID查询这个用户有没有上传头像
  const avatar = await findAvatarByUserid(parseInt(userid, 10));

  if (!avatar) {
    throw new Error('FILE_NOT_FIND');
  }

  //如果 存在，获取头像信息
  let filename = avatar.filename;
  let root = path.join('uploads', 'avatar');
  let resized = 'resized';

  //发送文件

  try {
    //检查对应查询的尺寸文件 是否存在
    const { size } = request.query;

    //检查查询 用法是否村子错误

    const sizetypes = ['large', 'medium', 'small'];

    const sizeExist = sizetypes.some(item => item == size);

    if (!sizeExist) {
      throw new Error('FILE_NOT_FIND');
    }

    //检查对应尺寸的文件是否存在
    const fileExist = await fs.existsSync(
      path.join(root, resized, `${filename}-${size}`),
    );
    if (!fileExist) throw new Error('FILE_NOT_FIND');

    //如果文件存在
    if (fileExist) {
      root = path.join(root, resized);
      filename = `${filename}-${size}`;

      response.sendFile(filename, {
        root,
        headers: {
          'Content-Type': avatar.mimetype,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
