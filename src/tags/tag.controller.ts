import { Request, Response, NextFunction } from 'express';

import { createtag, gettagByName } from './tag.service';


/**
 * 创建标签
 */

export const store = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    //获取name数据
    const { name } = request.body;

    try {

        const tag = await gettagByName(name);

        //如果标签存在 那么抛出异常  
        if (tag) throw new Error('TAG_HAS_EXIST');

        //如果标签不存在 存入标签数据库 
        const data = await createtag({ name });

        response.status(201).send(data);


    } catch (error) {
        next(error)
    }


};
