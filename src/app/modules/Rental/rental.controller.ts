import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rental.service";

const createRental = catchAsync(async (req, res) => {
  const token = req.headers.authorization || '';

  const result = await RentalServices.createRentalIntoDB(
    token,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental booked successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const token = req.headers.authorization || '';
  const result = await RentalServices.getAllRentalsFromDB(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});
const bikeIsAvailable = catchAsync(async (req, res) => {
  const token = req.headers.authorization || '';
  const {bikeId} = req.body;
  
  const result = await RentalServices.bikeIsAvailableInToDB(token, bikeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rentals Check successfully",
    data: result,
  });
});


const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization || '';
  const result = await RentalServices.returnBikeInToDB(token, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});

const updateRental = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization || '';
  const totalPaid = req.body; 
  
  const result = await RentalServices.updateRentalBikeInToDB(token, id, totalPaid.totalPaid);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental Payment Updated successfully!",
    data: result,
  });
});

export const RentalControllers = {
  createRental,
  getAllRentals,
  bikeIsAvailable,
  returnBike,
  updateRental, 
};
