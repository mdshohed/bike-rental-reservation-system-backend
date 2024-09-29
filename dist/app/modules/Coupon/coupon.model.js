"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
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
});
// filter out deleted documents
CouponSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
CouponSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Coupon = (0, mongoose_1.model)("Coupon", CouponSchema);
