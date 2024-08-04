import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getProfile = catchAsync(async ( req, res)=>{
  const result = await UserServices.getProfileFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
})

const updateProfile = catchAsync(async( req, res)=>{
  const result = await UserServices.updateProfileIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
})

export const UserControllers = {
  getProfile,
  updateProfile
}