import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'; //bcrypt 是一个跨平台的文件加密工具

import * as userservice from '../user/user.service';

/**
 * 下面，设定用户名处理的中间件
 */

export const validatelogin = async (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  //获取数据
  const { name, password } = request.body;

  //验证用户名是否存在
  if (!name) {
    return next(new Error('name_is_required'));
  }
  //验证密码是否存在
  if (!password) {
    return next(new Error('password_is_required'));
  }
  //验证用户名是否正确

  const user = await userservice.getuserbyname(name, { password: true });
  if (!user) {
    return next(new Error('name_is_not_exist'));
  }

  //采用bcrypt文件加密工具用来对比用户提交的密码和加密后的密码的对比情况
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return next(new Error('password_does_not_match'));
};
