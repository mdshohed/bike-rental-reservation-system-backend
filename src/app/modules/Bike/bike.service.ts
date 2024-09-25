import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const result = await Bike.find();
  return result;
};

const getSingleBikeFromDB = async (id:string) => {
  const result = await Bike.findById(id);
  console.log("id", id);
  
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, 'Bike Not Found!');
  }
  return result;
};

const updateBikeFromDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate( id , payload, {
    new: true,
  });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { isAvailable: false },
    {
      new: true,
    },
  );
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeFromDB,
  deleteBikeFromDB,
};
