import { Request, Response, NextFunction } from 'express';
import * as getpostsdata from './post.service';
import { createpost } from './post.service';
import _ from 'lodash';
import { EHOSTUNREACH } from 'constants';

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

/**
 * 创建存储并返回内容的 处理器
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //处理器从客户端接收数据

  const { title, content } = request.body;
  //从request.user提取相关用户id信息，作为评论的内容信息
  const { id: userid } = request.user;

  //插入并查询返回数据
  try {
    //调用函数将客户端返回的数据插入后返回
    const data = await createpost({ title, content, userid });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 设定更新数据的处理器函数
 */

export const gengxin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取客户端提交的id数据

  const { postid } = request.params;
  //获取客户端提交的修改内容数据
  //const { title, content } = request.body;
  //采用更高级的挑选参数模式
  const post = _.pick(request.body, ['title', 'content']);
  //调取处理器函数

  const data = await getpostsdata.updatepost(parseInt(postid), post);
  //返回给客户端数据
  response.send(data);
};

/**
 * 设定删除数据的处理器函数
 */

export const shanchu = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取客户端传来的id参数
  const { postid } = request.params;
  //执行删除指令
  try {
    const data = await getpostsdata.deletepost(parseInt(postid));
    response.send(data);
  } catch (error) {
    next(error);
  }
};
