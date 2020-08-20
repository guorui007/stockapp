import { connection } from '../app/datbase/mysql';
import { TagModel } from '../tags/tag.model';

/**
 * 创建数据标签
 */

export const createtag = async (tag: TagModel) => {
  //定义插入语句
  const statement = `insert into tag set ?`;
  //返回数据
  const [data] = await connection.promise().query(statement, tag);

  //console.log('tag数据,insertid', data, data[0]);

  return data as any;
};

/**
 * 按照名字查找标签
 */

export const gettagByName = async (tagname: string) => {
  //定义查询语句
  const statement = `select id,name from tag where name = ?`;
  const [data] = await connection.promise().query(statement, tagname);

  //返回数据

  console.log('按照用户名查询,返回tag数据', data, data[0]);
  return data[0];
};
