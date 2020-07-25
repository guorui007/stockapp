import { connection } from '../app/datbase/mysql';
import { UserModel } from './user.model';

/**
 * 创建用户
 */

export const createuser = async (user: UserModel) => {
  //定义查询指令
  const statement = `insert into user set ?`;
  //执行查询指令

  const [data] = await connection.promise().query(statement, user);
  //返回查询状态数据,是个字典

  return data;
};

/**
 * 按照用户名查找用户
 */
interface getuseroption {
  password?: boolean;
}

export const getuserbyname = async (
  name: string,
  options: getuseroption = {},
) => {
  //准备选项
  const { password } = options;

  //定义查询指令
  const statement = `select 
       id ,
       name
      ${password ? ',password' : ''}
       from user where name = ?`;

  //返回查询结果
  const [data] = await connection.promise().query(statement, name);

  return data[0];
};
