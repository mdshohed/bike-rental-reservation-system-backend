import { model, Schema } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    cc: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String
    }
  },
);

// filter out deleted documents
bikeSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bikeSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// bikeSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

export const Bike = model<TBike>("Bike", bikeSchema);
