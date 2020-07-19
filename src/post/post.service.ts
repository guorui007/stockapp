//import { connection } from 'src/app/datbase/mysql';

/**
 * 获取数据列表
 */
/**
 * 导入连接数据库
 */
import { connection } from '../app/datbase/mysql';
import { PostModle } from './post.model';

export const getposts = async () => {
  const statement = `
     SELECT 
        post.id,
        post.title,
        post.content,
        JSON_OBJECT(
          'ID',user.id,
          'Name',user.name
        ) as user from post left join user on user.id=post.userid 
  
  
  
  `;
  const [data] = await connection.promise().query(statement);

  return data;
};

/**
 * 创建内容,查询返回创建的内容
 */

export const createpost = async (post: PostModle) => {
  const statement = `insert into post set ?`;
  const [data] = await connection.promise().query(statement, post);
  return data;
};

/**
 * 更新内容，查询更新后的内容，返回结果
 */

export const updatepost = async (postid: number, post: PostModle) => {
  //定义更新指令
  const statement = `update post set ? where id = ?`;

  //查询
  const [data] = await connection.promise().query(statement, [post, postid]);
  return data;
};

/**
 * 删除内容，删除后查询返回新的数据表
 */

export const deletepost = async (postid: number) => {
  //定义删除指令
  const statement = `delete from post where id = ?`;
  //返回删除后的数据

  const [data] = await connection.promise().query(statement, postid);
  //返回删除后的状态表 显示到客户端是个字典格式
  return data;
};
