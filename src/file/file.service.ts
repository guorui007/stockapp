import { connection } from '../app/datbase/mysql';

import { FileModel } from '../file/file.model';

/**
 * 存储文件信息
 */

export const createfile = async (file: FileModel) => {
  //定义插入指令
  const statement = `insert into file set ?`;

  //执行
  const [data] = await connection.promise().query(statement, file);
  console.log(data);
  return data;
};

/**
 * 按照ID直接查找文件
 */

export const findFilebyId = async (fileid: number) => {
  //定义查询文件的指令
  const statement = `select * from file where id = ?`;

  //执行查询
  const [data] = await connection.promise().query(statement, fileid);

  //提供数据
  console.log('文件信息数据:' + data);
  return data[0];
};
