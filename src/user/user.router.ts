import express from 'express';

import * as usercontroller from './user.controller';
import * as validatemiddle from './user.middleware';
import { authguard } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 创建路由
 */

router.post(
  '/users',
  validatemiddle.validateuser,
  validatemiddle.hashpassword,
  usercontroller.store,
);

/**
 * h获取用户信息
 */

router.get('/users/:userid', usercontroller.showbyId);

/**
 * 更新用户信息
 */

router.patch(
  '/users/:id',
  authguard,
  validatemiddle.validateUpdateUserData,
  usercontroller.UserUpdate,
);

export default router;
