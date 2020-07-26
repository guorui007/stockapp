import jwt from 'jsonwebtoken';
import { PUBLIC_KEY, PRIVATE_KEY } from '../app/app.config';
import { connection } from '../app/datbase/mysql';

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

/**
 * 检查用户是否拥有指定资源
 */

/**
 * 定义一个参数类型
 */

interface PossesOption {
  resourceId: number;
  resourceType: string;
  userid: number;
}

//定义查询检查函数

export const possesOption = async (options: PossesOption) => {
  //结构参数

  const { resourceId, resourceType, userid } = options;

  //查询指令
  const statement = `
       SELECT COUNT(${resourceType}.id) as count
       FROM ${resourceType}
       WHERE ${resourceType}.id = ? and  ${resourceType}.userid = ?
`;

  //这里data其实返回的是包含对象的数组
  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userid]);

  return data[0].count ? true : false;
};
