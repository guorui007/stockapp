import express from 'express';

import * as usercontroller from './user.controller';
import * as validatemiddle from './user.middleware';

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

export default router;
