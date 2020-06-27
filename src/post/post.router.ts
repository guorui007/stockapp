import express from 'express';
import * as postcontroller from './post.controller';
import * as middlefunc from '../app/app.middleware';

/**
 * 创建路由
 */

const router = express.Router();
router.get('/posts', middlefunc.requesturl, postcontroller.index);

/**
 * 要引用，就要导出路由
 */
export default router;
