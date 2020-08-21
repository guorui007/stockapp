import { connection } from '../app/datbase/mysql';
import { CommentModel } from '../comment/comment.model';

/**
 * 创建评论
 */

export const createComment = async (conment: CommentModel) => {
  //定义查询语句
  const statement = `insert into comment set ?`;

  const data = await connection.promise().query(statement, conment);
  //提供数据
  return data;
};

/**
 * 检查评论 是否已经是作为子评论存在
 */
export const IsReplyHasParent = async (commentid: number) => {
  //定义查询语句
  const statement = `select parentid from comment where id = ?`;
  //查询数据
  const [data] = await connection.promise().query(statement, commentid);

  return data[0].parentid ? true : false;
};

/**
 * 定义更新内容
 */
export const updateComment = async (comment: CommentModel) => {
  //解构要修改的数据
  const { id, content } = comment;

  //定义更新语句
  const statement = `update comment set content = ? where id = ?`;

  //定义更新
  const [data] = await connection.promise().query(statement, [content, id]);

  return data;
};

/**
 * 定义删除内容
 */

export const deleteComment = async (commentid: number) => {
  //定义删除语句
  const statement = `delete from comment where id = ?`;

  const [data] = await connection.promise().query(statement, commentid);

  return data;
};
