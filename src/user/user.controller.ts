import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import * as userservice from './user.service';

/**
 * 存储客户端提交的用户信息： 用户名和密码
 *
 */

export const store = async (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  //首先，解构 前端提交的数据
  const { name, password } = request.body;

  //存储结构出来的数据
  try {
    const data = await userservice.createuser({ name, password });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
