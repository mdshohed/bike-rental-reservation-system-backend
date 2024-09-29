"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
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
});
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
exports.Bike = (0, mongoose_1.model)("Bike", bikeSchema);
