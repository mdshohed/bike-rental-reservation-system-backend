import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse, { sendLoginResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const signUpUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendLoginResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    token: accessToken,
    message: "User logged in successfully",
    data: user,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id; 
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset List is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
 
  const token = req.headers.authorization; 

  console.log(token);
  

  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Reset succesfully!',
    data: result,
  });
})

export const AuthControllers = {
  signUpUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword, 
  resetPassword,
};
