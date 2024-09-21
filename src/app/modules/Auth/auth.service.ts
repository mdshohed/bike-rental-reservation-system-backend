import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { sendEmail } from "../../utils/sendEmail";


interface TJwtToken{
  userEmail: string, 
  role: string
}

const signUpInToDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
  return newUser;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  // create token and sent to the  client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(userData.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }


  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  const { userEmail, iat} = decoded; 
  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  // }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userEmail: string) =>{

  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail( userEmail );  

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }


  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.reset_password_ui_link as string, 
  );

   
  const resetUILink = `http://localhost:3000?id=${user.email}&token=${accessToken}`; 
  
  sendEmail( user.email, resetUILink); 
 

  console.log(resetUILink);
}


const resetPassword = async (payload: { id: string, newPassword: string}, token: string) =>{
  
  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(payload.id);  

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);
  
  // const { userId, iat } = decoded;

  if( payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
}


export const AuthServices = {
  signUpInToDB,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword, 
};
