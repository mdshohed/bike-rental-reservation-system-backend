import { model, Schema } from "mongoose";
import { TRental } from "./rental.interface";

const RentalSchema = new Schema<TRental>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bike",
    },
    startTime: {
      type: Date,
      required: true,
    },
    returnTime: {
      type: Date,
      // required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false
    },
    totalPaid: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
  },
);



export const Rental = model<TRental>("Rental", RentalSchema);
