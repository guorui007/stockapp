import express from 'express';
import * as postcontroller from './post.controller';
import * as middlefunc from '../app/app.middleware';
//导入验证身份的中间件
import { authguard, accessControl } from '../auth/auth.middleware';

/**
 * 创建路由
 */

const router = express.Router();
router.get('/posts', middlefunc.requesturl, postcontroller.index);

//调用存储内容的处理器
router.post('/posts', authguard, postcontroller.store);

//调用更新内容的处理器
router.patch(
  '/posts/:postid',
  authguard, //token认证
  accessControl({ possession: true }), //查询授权验证
  postcontroller.gengxin,
);

//调用删除内容的处理器函数
router.delete(
  '/posts/:postid',
  authguard,
  accessControl({ possession: true }),
  postcontroller.shanchu,
);

/**
 * 要引用，就要导出路由
 */
export default router;
