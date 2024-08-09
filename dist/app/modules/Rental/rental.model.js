"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const mongoose_1 = require("mongoose");
const RentalSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    },
});
exports.Rental = (0, mongoose_1.model)("Rental", RentalSchema);
