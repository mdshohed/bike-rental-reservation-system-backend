"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rental_controller_1 = require("./rental.controller");
const rental_validation_1 = require("./rental.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(rental_validation_1.createRentalValidationSchema), rental_controller_1.RentalControllers.createRental);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), rental_controller_1.RentalControllers.getAllRentals);
router.get("/bikeIsAvailable/:id", 
// auth(USER_ROLE.admin, USER_ROLE.user),
rental_controller_1.RentalControllers.bikeIsAvailable);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), rental_controller_1.RentalControllers.updateRental);
router.put("/:id/return", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), rental_controller_1.RentalControllers.returnBike);
exports.RentalRoutes = router;
