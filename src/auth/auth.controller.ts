import { Request, Response, NextFunction } from 'express';
import { signtoken } from './auth.service';

/**
 * 定义用户姓名验证 接口
 */

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取用户信息 user是在前面的中间价里面 人为添加给request.body的数据
  const {
    user: { id, name },
  } = request.body;

  const payload = { id, name };

  try {
    //签发令牌，通过用户信息，密钥等生成的令牌
    const token = signtoken({ payload });
    //做出响应
    response.send({ id, name, token });
  } catch (error) {
    next(error);
  }
};

/**
 * 验证登陆
 */

export const validate = (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  console.log(request.user);

  response.sendStatus(200);
};
