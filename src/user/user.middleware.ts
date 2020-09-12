import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import * as userservice from './user.service';

/**
 * 用中间件函数验证用户信息
 */

export const validateuser = async (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  //获取数据
  const { name, password } = request.body;

  //验证数据
  if (!name) {
    return next(new Error('name_is_required'));
  }

  if (!password) {
    return next(new Error('password_is_required'));
  }

  //验证用户名是否存在

  const user = await userservice.getuserbyname(name);

  if (user) {
    console.log(user);
    return next(new Error('name_is_exist'));
  }

  //如果数据没有缺失，那么，下一步
  next();
};

/**
 * hash密码
 */

export const hashpassword = async (
  request: Request, //注意，这里三个参数的顺序是固定的，不然会出错
  response: Response,
  next: NextFunction,
) => {
  //获取密码  从request.body 这个主体里面结构对象
  const { password } = request.body;
  //将密码哈希化处理
  request.body.password = await bcrypt.hash(password, 10);
  next();
};

/**
 * 验证更新用户信息
 */

export const validateUpdateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取用户id 及更新 数据
  const { id: userid } = request.params;
  const { validate, update } = request.body;

  try {
    //首先，判断用户是否提供验证密码

    if (!_.has(validate, 'password')) {
      return next(new Error('password_is_required'));
    }

    //获取用户提供的密码是否正确

    const userdata = await userservice.getuserbyId(parseInt(userid, 10), {
      password: true,
    });

    //bcrpt.compare 对照密码  有严格的顺序 bcrypt.compare(新密码，hash后的原密码  )
    const passwordMatch = await bcrypt.compare(
      validate.password,
      userdata.password,
    );

    if (!passwordMatch) {
      return next(new Error('password_does_not_match'));
    } else {
      console.log('密码正确，bingo!');
    }

    //下面验证用户名

    if (update.name) {
      const nameMatch = await userservice.getuserbyname(update.name);

      console.log(typeof nameMatch, '---', nameMatch);

      if (nameMatch) {
        return next(new Error('name_is_exist'));
      }
    }

    //下面验证密码
    if (update.password) {
      const passwordMatch = await bcrypt.compare(
        update.password,
        userdata.password,
      );

      if (passwordMatch) {
        return next(new Error('Password_is_the_same'));
      }

      //如果密码不重复,将密码哈希化处理
      request.body.update.password = await bcrypt.hash(update.password, 10);
    }
  } catch (error) {
    return next(error);
  }

  //下一步
  next();
};
