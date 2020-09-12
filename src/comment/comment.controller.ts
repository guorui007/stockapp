import { Request, Response, NextFunction } from 'express';
import {
  createComment,
  IsReplyHasParent,
  updateComment,
  deleteComment,
  getComments,
  getTotalComments,
  getCommentReplies,
} from './comment.service';

/**
 * 发表评论
 */

export const createcomment = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //从前端获取数据

  const { id: userid } = request.user;
  const { postid, content } = request.body;

  const comment = {
    content,
    userid,
    postid,
  };

  //插入评论数据
  try {
    //[]解构，就相当于提取其中的数据
    const [data] = await createComment(comment);
    console.log('我们', data, data[0]);
    response.status(201).send(data);
  } catch (error) {
    return next(error);
  }
};

/**
 * 定义回复评论的接口
 */

export const reply = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取数据
  const { commentid } = request.params;
  const { id: userid } = request.user;
  const { content, postid } = request.body;

  const parentid = parseInt(commentid, 10);

  const comment = {
    content,
    postid,
    userid,
    parentid,
  };

  //如果当前评论已经是二级评论，那么不允许给当前评论再设计二级评论
  //如果当前评论  不是二级评论 ，那么可以将当前新回复设计为查询评论的二级评论

  try {
    const replyid = await IsReplyHasParent(parentid);
    if (replyid) return next(new Error('this_replay_cannot_reply'));
  } catch (error) {
    return next(error);
  }

  //创建新的回复评论，将当前回复内容作为commentid 对应的子回复
  const [data] = await createComment(comment);
  //console.log('ji那天', data, data[0]);

  response.status(201).send(data);
};

/**
 * 更新评论
 */

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取前端数据
  const { commentid } = request.params;

  const { content } = request.body;

  const comment = {
    id: parseInt(commentid),
    content,
  };

  //更新内容
  try {
    const data = await updateComment(comment);
    response.send(data);
  } catch (error) {
    return next(error);
  }
};

/**
 * 删除评论
 */

export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取删除评论的id
  const { commentid } = request.params;

  try {
    const data = await deleteComment(parseInt(commentid, 10));
    response.send(data);
  } catch (error) {
    return next(error);
  }
};

/**
 * 定义获取评论列表内容的接口
 */

export const getcomments = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取接口数据

  try {
    const totalcoms = await getTotalComments({
      filter: request.filter,
      panigate: request.pagination,
    });

    response.header('X-Total-C', totalcoms);
  } catch (error) {
    next(error);
  }

  try {
    const commentsdata = await getComments({
      filter: request.filter,
      panigate: request.pagination,
    });

    response.send(commentsdata);
  } catch (error) {
    next(error);
  }
};

/**
 * 定义获得评论回复列表的接口
 */

export const indexreplies = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取前端评论id 参数

  const { commentid } = request.params;

  try {
    const replies = await getCommentReplies({
      commentid: parseInt(commentid, 10),
    });

    response.send(replies);
  } catch (error) {
    next(error);
  }
};
