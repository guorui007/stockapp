import express from 'express';
import * as commentcontroller from './comment.controller';
import { authguard, accessControl } from '../auth/auth.middleware';
import { createComment, updateComment } from './comment.service';

const router = express.Router();

router.post('/comments', authguard, commentcontroller.createcomment);
/**
 * 定义回复评论的接口
 */

router.post('/comments/:commentid/reply', authguard, commentcontroller.reply);

/**
 * 定义修改评论接口
 */
router.patch(
  '/comments/:commentid',
  authguard,
  accessControl({ possession: true }),
  commentcontroller.update,
);

/**
 * 定义删除评论的接口
 */

router.delete(
  '/comments/:commentid',
  authguard,
  accessControl({ possession: true }),
  commentcontroller.destroy,
);
export default router;
