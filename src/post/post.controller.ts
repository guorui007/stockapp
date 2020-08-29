import { Request, Response, NextFunction, request } from 'express';
import * as getpostsdata from './post.service';
import { createpost } from './post.service';
import _ from 'lodash';
import { EHOSTUNREACH } from 'constants';

import { TagModel } from '../tags/tag.model';
import { gettagByName, createtag } from '../tags/tag.service';
import { nextTick } from 'process';

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
  //给前端返回 评论数量
  try {
    const totalcount = await getpostsdata.getPostsCount({
      filter: request.filter,
    });

    response.header('X-total-number', totalcount);
  } catch (error) {
    return next(error);
  }

  try {
    const postdata = await getpostsdata.getposts({
      sort: request.sort,
      filter: request.filter,
      pagination: request.pagination,
    });
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

/**
 * 添加内容标签
 */

export const storePostTag = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取数据
  const { postid } = request.params;
  const { name } = request.body;

  let tag: TagModel;

  //首先判定 name是否存在于tag表
  try {
    tag = await gettagByName(name);
  } catch (error) {
    return next(error);
  }

  //如果tag存在
  if (tag) {
    try {
      //判断tag是否属于特定内容
      const posttag = await getpostsdata.PostHasTag(
        parseInt(postid, 10),
        tag.id,
      );
      if (posttag) return next(new Error('post_has_this_tag'));
    } catch (error) {
      return next(error);
    }
  }

  //如果tag不存在
  if (!tag) {
    try {
      //首先,将tag存入tag表，
      const data = await createtag({ name });
      tag = { id: data.insertId };
    } catch (error) {
      return next(error);
    }
  }

  //tag不存在，或者存在但是没有对应到内容，那么给内容打上标签
  try {
    console.log(tag.id);
    const createtag = await getpostsdata.createPostTag(
      parseInt(postid, 10),
      tag.id,
    );
    //成功创建了资源，返回状态码201
    response.sendStatus(201);
  } catch (error) {
    console.log('出错1');
    return next(error);
  }
};

/**
 * 删除对应内容的标签
 */

export const deletePosttag = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取前端数据
  const { postid } = request.params;
  const { tagid } = request.body;

  //执行删除
  try {
    await getpostsdata.deletePostTag(parseInt(postid), tagid);
    //需要收到处理成功的反馈
    response.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
