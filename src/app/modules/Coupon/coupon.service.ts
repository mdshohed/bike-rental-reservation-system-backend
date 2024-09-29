import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCoupon } from "./coupon.interface";
import { Coupon } from "./coupon.model";
import { log } from "console";

const createCouponIntoDB = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Coupon Code Already Created!");
  }
  return result;
};

const getAllCouponsFromDB = async (query: Record<string, unknown>) => {
  const result = await Coupon.find();
  return result;
};

const getSingleCouponFromDB = async (id:string) => {
  const result = await Coupon.findById(id);  
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon Not Found!');
  }
  return result;
};

const updateCouponFromDB = async (id: string, payload: Partial<TCoupon>) => {
  
  const result = await Coupon.findByIdAndUpdate( id , payload, {
    new: true,
  });
  return result;
};


const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  getSingleCouponFromDB,
  updateCouponFromDB,
  deleteCouponFromDB,
};
