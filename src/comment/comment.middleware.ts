import { Request, Response, NextFunction } from 'express';

/**
 * 定义评论过滤器
 */

export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //定义request的filter属性
  request.filter = {
    name: 'defalut',
    sql: 'comment.parentid is null',
  };

  //获取过滤  查询参数
  const { post, user, action } = request.query;

  //根据获取的参数，重新定义filter,按照postid 查询
  if (post && !user && !action) {
    request.filter = {
      name: 'bypost',
      sql: 'comment.parentid is null and comment.postid = ?',
      param: `${post}`,
    };
  }
  //按照userid 查询

  if (user && action == 'published' && !post) {
    request.filter = {
      name: 'published',
      sql: 'comment.parentid is null and comment.userid = ?',
      param: `${user}`,
    };
  }

  //找出给定用户的回复评论
  if (user && action == 'reply' && !post) {
    request.filter = {
      name: 'reply',
      sql: 'comment.parentid is not null and comment.userid = ?',
      param: `${user}`,
    };
  }

  next();
};
