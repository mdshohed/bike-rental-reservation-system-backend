import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createRental = catchAsync(async ( req, res)=>{
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
})

const getAllRentals = catchAsync(async ( req, res)=>{
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
})

const returnBike = catchAsync(async ( req, res)=>{
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
})


export const BookingControllers = {
  createRental,
  getAllRentals,
  returnBike
}