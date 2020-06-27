import { Request, Response, NextFunction } from 'express';

export const requesturl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 设置异常处理器
 */
export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let statuscode: number, message: string;

  /**
   * 处理异常
   */
  switch (error.message) {
    default:
      statuscode = 500;
      message = error.message;
      break;
  }

  response.status(statuscode).send({ message });
};
