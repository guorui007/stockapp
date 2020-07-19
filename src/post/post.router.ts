import express from 'express';
import * as postcontroller from './post.controller';
import * as middlefunc from '../app/app.middleware';

/**
 * 创建路由
 */

const router = express.Router();
router.get('/posts', middlefunc.requesturl, postcontroller.index);

//调用存储内容的处理器
router.post('/posts', postcontroller.store);

//调用更新内容的处理器
router.patch('/posts/:postid', postcontroller.gengxin);

//调用删除内容的处理器函数
router.delete('/posts/:postid', postcontroller.shanchu);

/**
 * 要引用，就要导出路由
 */
export default router;
