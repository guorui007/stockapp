import express from 'express';

/**
 * 如果是默认导出的，那么导入时  直接import 重命名即可
 * 不然，要带括号导入 ，或者用  * as 重命名
 */

import postrouter from '../post/post.router';
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
app.use(postrouter);

/**
 * 捕捉异常信息
 */
app.use(defaultErrorHandler);

export default app;
