import express from 'express';
import * as filecontroller from './file.controller';
import { authguard } from '../auth/auth.middleware';
import { fileInterceptor, fileProcessor } from './file.middleware';

const router = express.Router();

router.post(
  '/files',
  authguard, //提供了request.user 的信息
  fileInterceptor, //提供了 request.file: Express.multer.File
  fileProcessor, //提供了file.metadata的定义信息，存储了不同格式的文件信息
  filecontroller.store,
);

/**
 * 定义文件服务接口,获取文件，返回到客户端
 */

router.get('/files/:fileid/serve', filecontroller.serve);

/**
 * 获取文件源信息
 */
router.get('/files/:fileid/metadata', filecontroller.metadata);
/**
 * 默认导出
 */
export default router;
