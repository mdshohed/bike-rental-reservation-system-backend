"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalServices = void 0;
// import { currentUser } from "../../utils/user.utils";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const rental_model_1 = require("./rental.model");
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const bike_model_1 = require("../Bike/bike.model");
const createRentalIntoDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeId, startTime, totalPaid, discount } = payload;
    const decoded = (jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret));
    const { userEmail } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.findOne({ email: userEmail }).select("_id");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const bike = yield bike_model_1.Bike.findById(bikeId);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike is not found !");
    }
    const existingRentals = yield rental_model_1.Rental.find({
        bikeId: bike === null || bike === void 0 ? void 0 : bike._id,
        isReturned: false,
    });
    if (existingRentals.length > 0) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This bike is currently rented and not yet returned.");
    }
    const duplicateRental = yield rental_model_1.Rental.findOne({
        userId: user === null || user === void 0 ? void 0 : user._id,
        bikeId: bike === null || bike === void 0 ? void 0 : bike._id,
    });
    if (duplicateRental) {
        const id = duplicateRental === null || duplicateRental === void 0 ? void 0 : duplicateRental._id;
        const result = yield rental_model_1.Rental.findByIdAndUpdate(id, {
            isReturned: false,
            startTime: startTime,
            returnTime: null,
            totalCost: 0,
        }, {
            $new: true,
        });
        const result2 = yield rental_model_1.Rental.findById(result === null || result === void 0 ? void 0 : result._id);
        return result2;
    }
    else {
        const bookingPayload = {
            userId: user === null || user === void 0 ? void 0 : user._id,
            bikeId: bike === null || bike === void 0 ? void 0 : bike._id,
            startTime: startTime,
            returnTime: null,
            totalCost: 0,
            totalPaid: totalPaid,
            discount: discount,
            isReturned: false,
            isPaid: false,
        };
        const result = yield rental_model_1.Rental.create(bookingPayload);
        if (result) {
            yield bike_model_1.Bike.findByIdAndUpdate(bike === null || bike === void 0 ? void 0 : bike._id, { isAvailable: false }, { new: true });
        }
        return result;
    }
});
const getAllRentalsFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { userEmail, role } = decoded;
    let result;
    if (role == 'admin') {
        result = yield rental_model_1.Rental.find().populate('bikeId').populate('userId');
    }
    else {
        const userId = yield user_model_1.User.findOne({ email: userEmail }).select("_id");
        result = yield rental_model_1.Rental.find({ userId: userId, isReturned: true }).populate('bikeId').populate('userId');
    }
    return result;
});
const bikeIsAvailableInToDB = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.Rental.find({ bikeId: id }).populate('bikeId').populate('userId');
    return result;
});
const returnBikeInToDB = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalExits = yield rental_model_1.Rental.findById(id);
    if (!rentalExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Rental not found!");
    }
    if (rentalExits.isReturned) {
        throw new AppError_1.default(http_status_1.default.FOUND, "Rental already returned!");
    }
    const pricePerHour = yield bike_model_1.Bike.findById(rentalExits.bikeId).select('pricePerHour');
    if (!pricePerHour) {
        throw new AppError_1.default(http_status_1.default.FOUND, "Bike Not Found");
    }
    const startTime = rentalExits.startTime;
    const currentTime = new Date();
    const timeDiffer = currentTime.getTime() - startTime.getTime();
    const hours = timeDiffer / (1000 * 60 * 60);
    // Calculate the total cost
    const pricePerHourValue = pricePerHour.pricePerHour;
    const totalCost = hours * pricePerHourValue;
    const totalCostWithDisCount = totalCost - ((totalCost * rentalExits.discount) / 100);
    const result = yield rental_model_1.Rental.findByIdAndUpdate(id, { isReturned: true, returnTime: new Date(), totalCost: totalCostWithDisCount }, {
        new: true,
        // runValidators: true,
    });
    if (result) {
        const bikeStatus = yield bike_model_1.Bike.findByIdAndUpdate(rentalExits.bikeId, { isAvailable: true }, { new: true });
    }
    return result;
});
const updateRentalBikeInToDB = (token, id, currentPaid) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalExits = yield rental_model_1.Rental.findById(id);
    if (!rentalExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Rental not found!");
    }
    const pricePerHour = yield bike_model_1.Bike.findById(rentalExits.bikeId).select('pricePerHour');
    if (!pricePerHour) {
        throw new AppError_1.default(http_status_1.default.FOUND, "Bike Not Found");
    }
    const startTime = rentalExits.startTime;
    const currentTime = rentalExits.returnTime;
    const timeDiffer = currentTime.getTime() - startTime.getTime();
    const hours = timeDiffer / (1000 * 60 * 60);
    const pricePerHourValue = pricePerHour.pricePerHour;
    const totalCost = (typeof (rentalExits === null || rentalExits === void 0 ? void 0 : rentalExits.totalCost) === 'number' ? rentalExits.totalCost : parseFloat(rentalExits === null || rentalExits === void 0 ? void 0 : rentalExits.totalCost) || 0);
    const totalPaid = (typeof (rentalExits === null || rentalExits === void 0 ? void 0 : rentalExits.totalPaid) === 'number' ? rentalExits.totalPaid : parseFloat(rentalExits === null || rentalExits === void 0 ? void 0 : rentalExits.totalPaid) || 0) +
        (typeof currentPaid === 'number' ? currentPaid : parseFloat(currentPaid) || 0);
    const result = yield rental_model_1.Rental.findByIdAndUpdate(id, { isPaid: totalPaid >= totalCost, totalPaid: totalPaid }, {
        new: true,
        // runValidators: true,
    });
    return result;
});
exports.RentalServices = {
    createRentalIntoDB,
    getAllRentalsFromDB,
    bikeIsAvailableInToDB,
    returnBikeInToDB,
    updateRentalBikeInToDB,
};
