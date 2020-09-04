import express from 'express';
import * as likecontroller from './like.controller';
import { authguard } from '../auth/auth.middleware';

const router = express.Router();

router.post('/posts/:postid/like', authguard, likecontroller.store);
router.delete('/posts/:postid/like', authguard, likecontroller.deletelike);

export default router;
