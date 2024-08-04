import { model, Schema } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>({
  name: {
    type: String,
    required: true,
  },
  description: { 
    type: String, 
    required: true 
  },
  pricePerHour: { 
    type: Number, 
    required: true 
  },
  isAvailable: { 
    type: Boolean, 
    required: true,
    default: true
  },
  cc: { 
    type: Number, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  // isDeleted: {
  //   type: Boolean,
  //   default: false,
  // },
  
},
{
  timestamps: true,
});

// filter out deleted documents
bikeSchema.pre('find', function (next) {
  this.find({ isAvailable: { $ne: false } });
  next();
});

bikeSchema.pre('findOne', function (next) {
  this.find({ isAvailable: { $ne: false } });
  next();
});

// bikeSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

export const Bike = model<TBike>("Bike", bikeSchema);
