//import { connection } from 'src/app/datbase/mysql';

/**
 * 获取数据列表
 */
/**
 * 导入连接数据库
 */
import { connection } from '../app/datbase/mysql';

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
