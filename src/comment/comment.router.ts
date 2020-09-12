import express from 'express';
import * as commentcontroller from './comment.controller';
import { authguard, accessControl } from '../auth/auth.middleware';
import { createComment, updateComment } from './comment.service';
import { filter } from './comment.middleware';
import { paginate } from '../post/post.middleware';
import { COMMENTS_PER_PAGE } from '../app/app.config';

const router = express.Router();

router.post('/comments', authguard, commentcontroller.createcomment);

/**
 * 获取评论
 */

router.get(
  '/comments',
  filter,
  paginate(COMMENTS_PER_PAGE),
  commentcontroller.getcomments,
);

/**
 * 定义回复评论的接口
 */

router.post('/comments/:commentid/reply', authguard, commentcontroller.reply);

/**
 * 获取评论的回复列表
 */

router.get('/comments/:commentid/replies', commentcontroller.indexreplies);

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
