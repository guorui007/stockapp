import express from 'express';
import * as authcontroller from '../auth/auth.controller';
import { validatelogin, authguard } from '../auth/auth.middleware';

const router = express.Router();

router.post('/login', validatelogin, authcontroller.login);

/**
 * 定义验证登陆接口
 */

router.post('/auth/validate', authguard, authcontroller.validate);

export default router;
