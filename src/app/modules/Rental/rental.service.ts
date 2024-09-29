// import { currentUser } from "../../utils/user.utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TBooking } from "./rental.interface";
import { Rental } from "./rental.model";
import { User } from "../User/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Bike } from "../Bike/bike.model";

const createRentalIntoDB = async (token: string, payload: TBooking) => {
  const { bikeId, startTime, totalPaid, discount  } = payload;
  const decoded = ( jwt.verify(
    token,
    config.jwt_access_secret as string,
  )) as JwtPayload;
  const { userEmail } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: userEmail }).select("_id");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const bike = await Bike.findById(bikeId);

  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike is not found !");
  }

  const existingRentals = await Rental.find({
    bikeId: bike?._id,
    isReturned: false,
  });

  if (existingRentals.length > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This bike is currently rented and not yet returned.",
    );
  }

  const duplicateRental = await Rental.findOne({
    userId: user?._id,
    bikeId: bike?._id,
  });

  if (duplicateRental) {
    const id = duplicateRental?._id;

    const result = await Rental.findByIdAndUpdate(
      id,
      {
        isReturned: false,
        startTime: startTime,
        returnTime: null,
        totalCost: 0,
      },
      {
        $new: true,
      },
    );
    const result2 = await Rental.findById(result?._id);
    return result2;
  } else {
    const bookingPayload = {
      userId: user?._id,
      bikeId: bike?._id,
      startTime: startTime,
      returnTime: null,
      totalCost: 0,
      totalPaid: totalPaid,
      discount: discount,
      isReturned: false,
      isPaid: false,
    };
    const result = await Rental.create(bookingPayload);
    if(result){
      await Bike.findByIdAndUpdate(bike?._id, { isAvailable: false}, {new:true})
    }
    return result;
  }
};

const getAllRentalsFromDB = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { userEmail, role} = decoded;
 
  let result; 
  if(role=='admin'){
    result = await Rental.find().populate('bikeId').populate('userId');
  }
  else{
    const userId = await User.findOne({ email: userEmail }).select("_id");
    result = await Rental.find({ userId: userId, isReturned: true }).populate('bikeId').populate('userId');
  }
  return result;
};

const bikeIsAvailableInToDB = async (token: string, id:string) => {
  const result = await Rental.find({ bikeId: id }).populate('bikeId').populate('userId');
  return result;
};

const returnBikeInToDB = async (token: string, id: string) => {
  const rentalExits = await Rental.findById(id);

  if (!rentalExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }
  if (rentalExits.isReturned) {
    throw new AppError(httpStatus.FOUND, "Rental already returned!");
  }
  const pricePerHour = await Bike.findById(rentalExits.bikeId).select('pricePerHour');
  
  if (!pricePerHour) {
    throw new AppError(httpStatus.FOUND, "Bike Not Found");
  }
  const startTime = rentalExits.startTime;
  const currentTime = new Date();
  const timeDiffer = currentTime.getTime() - startTime.getTime();

  const hours = timeDiffer / (1000 * 60 * 60);

  // Calculate the total cost
  const pricePerHourValue = pricePerHour.pricePerHour; 
  const totalCost = hours * pricePerHourValue;

  const totalCostWithDisCount = totalCost - (( totalCost*rentalExits.discount)/100)

  const result = await Rental.findByIdAndUpdate(
    id,
    { isReturned: true, returnTime: new Date(), totalCost: totalCostWithDisCount },
    {
      new: true,
      // runValidators: true,
    },
  );
  if(result) {
    const bikeStatus = await Bike.findByIdAndUpdate(rentalExits.bikeId, {isAvailable: true}, {new: true})
  }
  return result;
};

const updateRentalBikeInToDB = async (token: string, id: string, currentPaid: number) => {
  const rentalExits = await Rental.findById(id);

  if (!rentalExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }
  const pricePerHour = await Bike.findById(rentalExits.bikeId).select('pricePerHour');
  
  if (!pricePerHour) {
    throw new AppError(httpStatus.FOUND, "Bike Not Found");
  }
  const startTime = rentalExits.startTime;
  const currentTime = rentalExits.returnTime;
  const timeDiffer = currentTime.getTime() - startTime.getTime();

  const hours = timeDiffer / (1000 * 60 * 60);

  const pricePerHourValue = pricePerHour.pricePerHour;
  const totalCost: number =  (typeof rentalExits?.totalCost === 'number' ? rentalExits.totalCost : parseFloat(rentalExits?.totalCost as string) || 0)
  const totalPaid: number = 
  (typeof rentalExits?.totalPaid === 'number' ? rentalExits.totalPaid : parseFloat(rentalExits?.totalPaid as string) || 0) + 
  (typeof currentPaid === 'number' ? currentPaid : parseFloat(currentPaid as string) || 0);

  

  const result = await Rental.findByIdAndUpdate(
    id,
    { isPaid:  totalPaid >= totalCost, totalPaid: totalPaid },
    {
      new: true,
      // runValidators: true,
    },
  );
  return result;
};

export const RentalServices = {
  createRentalIntoDB,
  getAllRentalsFromDB,
  bikeIsAvailableInToDB,
  returnBikeInToDB,
  updateRentalBikeInToDB,
};
