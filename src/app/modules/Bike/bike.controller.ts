import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeServices } from "./bike.service";


const createBike = catchAsync(async ( req, res)=>{
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
})



export const BikeControllers = {
  createBike,
  // getSingleBike,
  // deleteBike,
  // updateBike,
}; 