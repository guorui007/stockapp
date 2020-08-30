import express from 'express';

/**
 * 如果是默认导出的，那么导入时  直接import 重命名即可
 * 不然，针对对象(model)要带括号导入 ，针对方法(service) 用  * as 重命名导入
 */

import postrouter from '../post/post.router';
import userrouter from '../user/user.router';
import authrouter from '../auth/auth.router';
import filerouter from '../file/file.router';
import tagrouter from '../tags/tag.router';
import commentrouter from '../comment/comment.router';
import avatarrouter from '../avatar/avatar.router';
//import userrouter from '../user/user.router';
import { defaultErrorHandler } from './app.middleware';

/**
 * 创建应用
 */
const app = express();

/**
 * 处理JSON
 */
app.use(express.json());

/**
 * 导出应用
 */
app.use(
  postrouter,
  userrouter,
  authrouter,
  filerouter,
  tagrouter,
  commentrouter,
  avatarrouter,
);

/**
 * 捕捉异常信息
 */
app.use(defaultErrorHandler);

export default app;
