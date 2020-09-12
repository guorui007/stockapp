import { connection } from '../app/datbase/mysql';
import { CommentModel } from '../comment/comment.model';
import { sqlfragement } from './comment.provider';
import {
  GetPostsOptionsFilter,
  GetPostOptionsPagination,
} from '../post/post.service';
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

/**
 * 获取评论数据
 */

//定义数据接口

interface GetCommentsOptions {
  filter?: GetPostsOptionsFilter;
  panigate: GetPostOptionsPagination;
}

export const getComments = async (options: GetCommentsOptions) => {
  const {
    filter,
    panigate: { limit, offset },
  } = options;

  //定义查询参数
  //定义变量数组 类型 ，首字母需要大写
  let params: Array<any> = [limit, offset];

  if (filter.param) {
    params = [filter.param, ...params];
  }

  //定义 查询语句
  //在这里  见识了   字符模板   嵌套字符模板
  const statement = `
        select 
            comment.id,
            comment.content,
            ${sqlfragement.user},
            ${sqlfragement.post}
            ${filter.name == 'reply' ? `,${sqlfragement.repliedComment}` : ''}
            ${
              filter.name == 'published' ? `,${sqlfragement.totalcomments}` : ''
            }
        from comment
             ${sqlfragement.leftjoinUser}
             ${sqlfragement.leftjoinpost}
        where ${filter.sql}
        group by comment.id
        order by comment.id desc
        limit ?
        offset ? 
    `;

  //执行查询

  const [data] = await connection.promise().query(statement, params);

  return data;
};

/**
 * 定义获得评论数量的方法
 */

export const getTotalComments = async (options: GetCommentsOptions) => {
  //解构数据

  const { filter } = options;
  let params: Array<any> = [];
  if (filter.param) {
    params = [filter.param, ...params];
  }
  //定义查询语句
  const statement = `
           select 
              count(distinct comment.id) as total
            from comment
            ${sqlfragement.leftjoinUser}
            ${sqlfragement.leftjoinpost}
            where
                ${filter.sql}
      `;

  //获取统计数据
  const [data] = await connection.promise().query(statement, params);
  return data[0].total;
};

/**
 * 定义获取评论列表的处理放啊
 */

interface GetCommentsOptionsreply {
  commentid: number;
}

export const getCommentReplies = async (options: GetCommentsOptionsreply) => {
  //解构获得的数据
  const { commentid } = options;

  //定义查询语句

  const statement = `
        select
           comment.id,
           comment.content,
           ${sqlfragement.user}
        from comment
           ${sqlfragement.leftjoinUser}
        where
           comment.parentid = ?
        group by comment.id 
    
    `;

  //执行查询
  const [data] = await connection.promise().query(statement, commentid);

  //返回数据
  return data;
};
