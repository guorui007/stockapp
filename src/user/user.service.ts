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

//options 穿透到底层 依然是个可选参数
export const getuser = (sxtype: string) => {
  return async (params: string | number, options: getuseroption = {}) => {
    //准备选项
    const { password } = options;

    //定义查询指令
    const statement = `select 
         user.id,
         user.name,
         if (count(avatar.id),1,null) as avatar 
         ${password ? ',user.password' : ''}
         from user
         left join avatar 
         on user.id=avatar.userid  
         where ${sxtype} = ?
         group by user.id 
         
         `;

    //返回查询结果
    const [data] = await connection.promise().query(statement, params);
    console.log(data, data[0], '哈哈哈');
    return data[0];
  };
};

//定义按照用户名查询用户
export const getuserbyname = getuser('user.name');

//定义按照用户id查询用户，getuserbyId是由 getuser创建的新函数 包含params 和options 两个参数
export const getuserbyId = getuser('user.id');

//select 查询  返回的[data] 里面的data 一般是 列表格式，[{}] data[0]代表首个查询的来的对象
//update  更新    [data] 里面的data就只是返回一个对象 {} 一般不存在  data[0]  注意

/**
 * 更新用户数据
 */

export const gengXinUser = async (id: number, usersdata: UserModel) => {
  const params = [usersdata, id];

  //定义更新语句
  const statement = `
    update user set ?  where id = ?
  `;

  //执行查询

  const [data] = await connection.promise().query(statement, params);

  //console.log(data[0], 'oooooo');

  return data;
};
