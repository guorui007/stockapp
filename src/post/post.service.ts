//import { connection } from 'src/app/datbase/mysql';

/**
 * 获取数据列表
 */
/**
 * 导入连接数据库
 */
import { connection } from '../app/datbase/mysql';
import { PostModle } from './post.model';
import { sqlfragement } from './post.provider';
//interface 接口 也是 可以导出 的
export interface GetPostsOptionsFilter {
  name: string;
  sql?: string;
  param?: string;
}

export interface GetPostOptionsPagination {
  limit?: number;
  offset?: number;
}

interface SortOrNot {
  sort?: string;
  filter?: GetPostsOptionsFilter;
  pagination?: GetPostOptionsPagination;
}
export const getposts = async (option: SortOrNot) => {
  const {
    sort,
    filter,
    pagination: { limit, offset }, //可以直接从这个参数中解构需要的数据
  } = option;

  //sql参数
  let params: Array<any> = [limit, offset];
  if (filter.param) {
    params = [filter.param, ...params];
  }

  const statement = `
     SELECT 
        post.id,
        post.title,
        post.content,
        ${sqlfragement.user},
        ${sqlfragement.totalComments},
        ${sqlfragement.file},
        ${sqlfragement.tags}
        
        from post 
        ${sqlfragement.leftjoin}
        ${sqlfragement.leftjoinfile}
        ${sqlfragement.leftjointags} 
        where ${filter.sql}
        group by post.id
        order by ${sort}
        limit ? 
        offset ?
  
  
  
  `;
  const [data] = await connection.promise().query(statement, params);

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

/**
 * 保存内容标签
 */

export const createPostTag = async (postid: number, tagid: number) => {
  //定义插入语句

  const statement = `insert into posttag (postid,tagid) values(?,?)`;

  //执行
  const [data] = await connection.promise().query(statement, [postid, tagid]);

  //返回数据

  return data;
};

/**
 * 查询是否针对特定内容   存在特定标签
 */

export const PostHasTag = async (postid: number, tagid: number) => {
  //定义查询语句
  const statement = `select * from posttag where postid= ? and tagid =? `;

  //执行
  const [data] = await connection.promise().query(statement, [postid, tagid]);

  //返回
  return data[0] ? true : false;
};

/**
 * 删除内容标签
 */

export const deletePostTag = async (postid: number, tagid: number) => {
  //定义删除语句
  const statement = `delete from posttag where postid = ? and tagid = ?`;

  const [data] = await connection.promise().query(statement, [postid, tagid]);
  console.log('删除后返回的:', data);
  return data;
};

/**
 * 统计内容数量
 */

/**
 * 获取统计内容的数量
 */

export const getPostsCount = async (options: SortOrNot) => {
  //解构数据
  const { filter } = options;

  //定义查询变量
  let params = [filter.param];
  //定义查询语句

  const statement = `
      select 
         count(distinct post.id) as total
      from post
      ${sqlfragement.leftjoin}
        ${sqlfragement.leftjoinfile}
        ${sqlfragement.leftjointags} 
        where ${filter.sql}
   
   `;

  //执行查询
  const [data] = await connection.promise().query(statement, params);
  return data[0].total;
};
