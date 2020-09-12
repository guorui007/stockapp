import dotenv from 'dotenv';

//载入根目录下面的.env文件定义的环境变量  APP_PORT=3000
dotenv.config();

/**
 * 应用配置
 */

export const { APP_PORT } = process.env;
//console.log(process.env);

/**
 *
 * 数据仓库配置
 */

export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

/**
 * 密钥配置
 */

export let { PRIVATE_KEY, PUBLIC_KEY } = process.env; //let 是定义变量的用法
PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString();

/**
 * 导出内容分页参数
 */
//将系统参数转化为整数
export const POSTS_PER_PAGE = parseInt(process.env['POSTS_PER_PAGE'], 10);

//将系统分页参数转化为整数
export const COMMENTS_PER_PAGE = parseInt(process.env['COMMENTS_PER_PAGE'], 10);
