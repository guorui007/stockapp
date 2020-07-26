import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; //bcrypt 是一个跨平台的文件加密工具

import * as userservice from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possesOption } from './auth.service';

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

  //在请求主题里面添加用户数据
  request.body.user = user;

  //下一个函数
  next();
};

/**
 * 验证用户身份
 */

export const authguard = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('验证用户身份');

  try {
    //提取 authorization
    const authorization = request.header('Authorization');
    if (!authorization) throw new Error();

    //提取JWT令牌
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    //验证令牌 并返回令牌包含的信息
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    console.log('当前用户信息/n', decoded);
    //在请求里面添加当前用户
    request.user = decoded as TokenPayload;

    //下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};

/**
 * 访问控制
 */

interface AccessControlOptions {
  possession?: boolean;
}

//注意这种嵌套处理方式，可以为中间件增加额外参数
export const accessControl = (options: AccessControlOptions) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    //解构options参数

    const { possession } = options;
    //在authguard中间件之后，获取request.user信息
    const { id: userid } = request.user;

    //如果是超级管理员，不做限制那么  return next() 会直接跳转出当前的中间件函数，执行下面的接口函数
    if (userid == 9) return next();
    //获取客户端所需要的资源数据
    const resourceidparams = Object.keys(request.params)[0];
    //获取resourceType数据
    const resourceType = resourceidparams.replace('id', '');
    //获取resourceid信息
    const resourceId = parseInt(request.params[resourceidparams], 10);

    //判断是否要进行访问控制
    if (possession) {
      try {
        //查询post数据表，看是否存在resourceid 和 userid匹配的内容
        const ownsource = await possesOption({
          resourceId,
          resourceType,
          userid,
        });

        //如果没有查询到，返回异常提示
        if (!ownsource) {
          return next(new Error('DOED_NOT_OWN_RESOURCE'));
        }
      } catch (error) {
        return next(error);
      }
    }

    next();
  };
};
