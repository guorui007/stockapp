import { connection } from '../app/datbase/mysql';
import { AvatarModel } from './avatar.model';

//service 需要导入的两个文件是标准的   1  连接数据库 2  导入定义好的数据结构

export const createAvatar = async (avatardata: AvatarModel) => {
  //定义查询语句
  const statement = `
       insert into avatar set ?
    `;

  //执行查询

  const [data] = await connection.promise().query(statement, avatardata);

  //返回数据
  return data;
};

/**
 * 按照用户id查找图像
 */

export const findAvatarByUserid = async (userid: number) => {
  //确定查询语句
  const statement = `
        select * from avatar 
        where userid = ? 
        order by avatar.id desc limit 1
     
     
     `;

  //执行查询
  const [data] = await connection.promise().query(statement, userid);

  return data[0];
};
