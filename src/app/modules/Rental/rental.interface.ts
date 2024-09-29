import { Types } from "mongoose";

export interface TRental {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
  discount: number; 
  totalPaid: number, 
  isPaid: boolean, 
}

export type TBooking = {
  bikeId: Types.ObjectId;
  startTime: Date;
  totalPaid: number, 
  isPaid: boolean, 
  discount: number,
};
