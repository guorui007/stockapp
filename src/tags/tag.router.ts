import express from 'express';
import * as tagcontroller from '../tags/tag.controller';

import { authguard } from '../auth/auth.middleware'

const router = express.Router();

/**
 * 定义创建标签的接口 
 */

router.post('/tags', authguard, tagcontroller.store);

export default router