import { Request, Response, NextFunction } from 'express';

/**
 * 定义用户姓名验证 接口
 */

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取用户信息
  const { name, password } = request.body;
  response.send({ message: '欢迎你' + name });
};
