import jwt from 'jsonwebtoken';
import { PUBLIC_KEY, PRIVATE_KEY } from '../app/app.config';

/**
 * 签发令牌
 */

interface signtokenoptions {
  payload?: any;
}

export const signtoken = (options: signtokenoptions) => {
  //解构数据
  const { payload } = options;

  //签发JWT令牌   根据数据、密钥、算法编码生成令牌
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });

  //提供JWT

  return token;
};
