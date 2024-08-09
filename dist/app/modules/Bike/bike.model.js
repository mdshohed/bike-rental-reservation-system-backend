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
        required: true,
        default: true,
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
});
// filter out deleted documents
bikeSchema.pre("find", function (next) {
    this.find({ isAvailable: { $ne: false } });
    next();
});
bikeSchema.pre("findOne", function (next) {
    this.find({ isAvailable: { $ne: false } });
    next();
});
// bikeSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });
exports.Bike = (0, mongoose_1.model)("Bike", bikeSchema);
