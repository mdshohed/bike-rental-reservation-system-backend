"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("./coupon.controller");
const coupon_validation_1 = require("./coupon.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.get("/", coupon_controller_1.CouponControllers.getAllCoupons);
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(coupon_validation_1.CouponValidations.createCouponValidationSchema), coupon_controller_1.CouponControllers.createCoupon);
router.get("/:id", coupon_controller_1.CouponControllers.getSingleCoupon);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(coupon_validation_1.CouponValidations.updateCouponValidationSchema), coupon_controller_1.CouponControllers.updateCoupon);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), coupon_controller_1.CouponControllers.deleteCoupon);
exports.CouponRoutes = router;
