import { Request, Response, NextFunction } from 'express';

import { createUserLikePost, deleteUserLikePost } from './like.service';
import { connection } from '../app/datbase/mysql';

/**
 * 点赞内容
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取点赞内容编号，以及用户id编号
  const { postid } = request.params;
  const { id: userid } = request.user;

  //存储内容
  try {
    const data = await createUserLikePost(userid, parseInt(postid, 10));
    //做出响应
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
/**
 * 定义取消点赞内容
 */

export const deletelike = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取数据信息
  const { postid } = request.params;
  const { id: userid } = request.user;

  try {
    const data = await deleteUserLikePost(userid, parseInt(postid, 10));
    console.log(data, data[0]);
    response.send(data);
  } catch (error) {
    next(error);
  }
};
