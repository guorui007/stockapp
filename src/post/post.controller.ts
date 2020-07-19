import { Request, Response, NextFunction } from 'express';
import * as getpostsdata from './post.service';

export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // if (request.headers.authorization !== 'SECRET') {
  //   /**
  //    * 这里注意 如果next函数前面不加return 那么，抛出异常以后会继续执行控制器其他函数
  //    */
  //   return next(new Error('错了错了'));
  // }

  try {
    const postdata = await getpostsdata.getposts();
    response.send(postdata);
  } catch (error) {
    next(error);
  }
};
