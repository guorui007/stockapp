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
