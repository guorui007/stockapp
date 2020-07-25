import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as userservice from './user.service';

/**
 * 用中间件函数验证用户信息
 */

export const validateuser = async (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  //获取数据
  const { name, password } = request.body;

  //验证数据
  if (!name) {
    return next(new Error('name_is_required'));
  }

  if (!password) {
    return next(new Error('password_is_required'));
  }

  //验证用户名是否存在

  const user = await userservice.getuserbyname(name);

  if (user) {
    console.log(user);
    return next(new Error('name_is_exist'));
  }

  //如果数据没有缺失，那么，下一步
  next();
};

/**
 * hash密码
 */

export const hashpassword = async (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  //获取密码  从request.body 这个主体里面结构对象
  const { password } = request.body;
  //将密码哈希化处理
  request.body.password = await bcrypt.hash(password, 10);
  next();
};
