import express from 'express';
import * as avatarcontroller from './avatar.controller';

import { authguard } from '../auth/auth.middleware';
import {
  avatarInterceptor,
  avatarProcessor,
} from '../avatar/avatar.middleware';

//定义 router

const router = express.Router();

router.post(
  '/avatar',
  authguard,
  avatarInterceptor,
  avatarProcessor,
  avatarcontroller.store,
);

router.get('/users/:userid/avatar', avatarcontroller.serve);
export default router;
