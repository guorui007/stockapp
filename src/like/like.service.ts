import { connection } from '../app/datbase/mysql';

export const createUserLikePost = async (userid: number, postid: number) => {
  //定义插入语句
  const statement = `insert into user_like_post (userid,postid) values(?,?)`;
  //const statement=`insert into user_like_post set `

  //执行插入并返回数据
  const [data] = await connection.promise().query(statement, [userid, postid]);

  //提供数据
  return data;
};

/**
 * 取消用户点赞内容
 */

export const deleteUserLikePost = async (userid: number, postid: number) => {
  //定义删除语句

  const statement = `
           delete from user_like_post where userid = ? and postid = ? 
       
       `;
  //执行删除 并返回数据
  const [data] = await connection.promise().query(statement, [userid, postid]);

  //返回数据
  return data;
};
