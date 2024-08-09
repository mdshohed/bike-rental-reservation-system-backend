import { Response } from "express";

type TResponse<T> = {
  statusCode: number, 
  success: Boolean, 
  message: string, 
  token?: string,
  data: T;
}

const sendResponse = <T>( res: Response, data: TResponse<T> ) =>{
  res.status(data.statusCode).json({
    success: data.success, 
    statusCode: data.statusCode,
    message: data.message, 
    // token: data.accessToken,
    data: data.data, 
  })
}

export const sendLoginResponse = <T>( res: Response, data: TResponse<T> ) =>{
  res.status(data.statusCode).json({
    success: data.success, 
    statusCode: data.statusCode,
    message: data.message, 
    token: data.token,
    data: data.data, 
  })
}

export default sendResponse; 