import { Request, Response, NextFunction } from 'express';

/**
 * 定义场景查询
 */

/**
 * 处理排序字段
 */

export const sort = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //解构前端数据
  const { sort } = request.query;

  //定义存储变量
  let sortsql: string;

  //判定sort类别
  //分情况 处理sort
  switch (sort) {
    case 'earlist':
      sortsql = 'post.id asc';
      break;
    case 'latest':
      sortsql = 'post.id desc';
      break;
    default:
      sortsql = 'post.id desc';
      break;
  }

  //给request.sort 赋值
  request.sort = sortsql;
  //下一步流转
  next();
};

/**
 * 过滤列表
 */

export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //解构数据
  const { tag, user, action } = request.query;

  console.log('我想自由', tag, typeof tag, user, action, typeof request.query);

  request.filter = {
    name: 'default',
    sql: 'post.id IS NOT NULL',
  };

  if (tag && !user && !action) {
    request.filter = {
      name: 'tagName',
      sql: 'tag.name = ?',
      //字符模板 用双斜杠  可以把需要的内容转化成 字符串
      param: `${tag}`,
    };
  }

  if (user && action == 'published' && !tag) {
    request.filter = {
      name: 'user',
      sql: 'user.id = ?',
      param: `${user}`,
    };
  }

  //过滤出用户点过赞的内容
  if (user && action == 'liked' && !tag) {
    request.filter = {
      name: 'userliked',
      sql: 'user_like_post.userid = ?',
      param: `${user}`,
    };
  }

  next();
};

/**
 * 内容分页
 */

export const paginate = (itemPerPage: number) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    //获取页码
    const { page = 1 } = request.query;

    //定义每页的内容数量，如果没有  定义为30
    const limit = itemPerPage || 30;

    //计算偏移 亮
    const offset = limit * (parseInt(`${page}`, 10) - 1);

    request.pagination = {
      limit,
      offset,
    };

    next();
  };
};
