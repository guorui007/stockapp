import express from 'express';
import * as filecontroller from './file.controller';
import { authguard } from '../auth/auth.middleware';
import { fileInterceptor } from './file.middleware';

const router = express.Router();

router.post('/files', authguard, fileInterceptor, filecontroller.store);

/**
 * 定义文件服务接口
 */

router.get('/files/:fileid/serve', filecontroller.serve);

/**
 * 默认导出
 */
export default router;
