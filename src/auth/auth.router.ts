import express from 'express';
import * as authcontroller from '../auth/auth.controller';
import { validatelogin } from '../auth/auth.middleware';

const router = express.Router();

router.post('/login', validatelogin, authcontroller.login);

export default router;
