import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import * as userservice from './user.service';
import _ from 'lodash';

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

/**
 * 定义按照id获取用户的处理器函数
 */

export const showbyId = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //首先 获取数据
  const { userid } = request.params;

  try {
    //获取用户信息

    const userdata = await userservice.getuserbyId(parseInt(userid, 10));

    //console.log(userdata, 'ooooooo');

    if (!userdata) {
      throw new Error('NOT_FIND_USER');
    }

    response.send(userdata);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新用户
 */

/**
 * update user infos
 */

export const UserUpdate = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //解构前端数据

  const { id } = request.params;

  const { validate, update } = request.body;

  //获取数据  _.pick(update,['password','name'])
  const userdata = _.pick(update, ['name', 'password']);

  try {
    //获取数据
    const updateuser = await userservice.gengXinUser(
      parseInt(id, 10),
      userdata,
    );
    response.send(updateuser);
  } catch (error) {
    next(error);
  }
};
