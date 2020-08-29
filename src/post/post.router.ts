import express from 'express';
import * as postcontroller from './post.controller';
import * as middlefunc from '../app/app.middleware';
//导入验证身份的中间件
import { authguard, accessControl } from '../auth/auth.middleware';
import { sort, filter, paginate } from './post.middleware';

/**
 * 创建路由
 */

const router = express.Router();
router.get('/posts', sort, filter, paginate, postcontroller.index);

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
 * 添加内容标签
 */
router.post(
  '/posts/:postid/tag',
  authguard,
  accessControl({ possession: true }),
  postcontroller.storePostTag,
);

/**
 * 删除内容标签
 */
router.delete(
  '/posts/:postid/tag',
  authguard,
  accessControl({ possession: true }),
  postcontroller.deletePosttag,
);

/**
 * 要引用，就要导出路由
 */
export default router;
