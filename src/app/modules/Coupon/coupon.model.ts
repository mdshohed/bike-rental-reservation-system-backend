import { model, Schema } from "mongoose";
import { TCoupon } from "./coupon.interface";

const CouponSchema = new Schema<TCoupon>(
  {
    couponCode: {
      type: String,
      unique: true,
      required: true,
    },
    
    percentage: {
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
  },
);

// filter out deleted documents
CouponSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CouponSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Coupon = model<TCoupon>("Coupon", CouponSchema);
