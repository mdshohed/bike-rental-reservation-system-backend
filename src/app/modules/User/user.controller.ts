import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getAll = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  
  const result = await UserServices.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getProfileFromDB(token?token:'');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.updateProfileIntoDB(token?token:'', req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const {id } = req.params; 
  const result = await UserServices.updateUserIntoDB(id, req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated successfully",
    data: result,
  });
});

export const UserControllers = {
  getAll,
  getProfile,
  updateProfile,
  updateUser
};
