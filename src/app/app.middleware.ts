import { Request, Response, NextFunction } from 'express';

export const requesturl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 设置异常处理器
 */
export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('出错啦la', error.message);
  }

  let statuscode: number, message: string;

  /**
   * 处理异常
   */
  switch (error.message) {
    case 'name_is_required':
      statuscode = 400;
      message = '请提供用户名';
      break;
    case 'password_is_required':
      statuscode = 400;
      message = '请提供用户密码';
      break;
    case 'name_is_exist':
      statuscode = 409;
      message = '用户名已经存在';
      break;
    case 'name_is_not_exist':
      statuscode = 400;
      message = '用户名不正确';
      break;
    case 'password_does_not_match':
      statuscode = 400;
      message = '密码不对';
      break;
    case 'UNAUTHORIZED':
      statuscode = 401; //未授权
      message = '请先登陆';
      break;
    case 'FILE_NOT_FIND':
      statuscode = 404; //未授权
      message = '文件不存在';
      break;
    case 'DOED_NOT_OWN_RESOURCE':
      statuscode = 403; //禁止
      message = '您不能处理这个内容';
      break;
    case 'TAG_HAS_EXIST':
      statuscode = 400; //
      message = '标签已经存在';
      break;
    case 'this_replay_cannot_reply':
      statuscode = 400; //
      message = '这个回复是二级回复，不能被再回复';
      break;
    case 'post_has_this_tag':
      statuscode = 400; //
      message = '内容已经存在这个标签';
      break;
    case 'FILE_TYPE_IS_NOT_ALLOWED':
      statuscode = 400; //
      message = '文件类型不允许';
      break;
    default:
      statuscode = 500;
      message = error.message;
      break;
  }

  response.status(statuscode).send({ message });
};
