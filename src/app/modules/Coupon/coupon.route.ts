import express from "express";
import { CouponControllers } from "./coupon.controller";
import { CouponValidations } from "./coupon.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.get("/", CouponControllers.getAllCoupons);

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(CouponValidations.createCouponValidationSchema),
  CouponControllers.createCoupon,
);

router.get("/:id", CouponControllers.getSingleCoupon);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(CouponValidations.updateCouponValidationSchema),
  CouponControllers.updateCoupon,
);

router.delete("/:id", 
  auth(USER_ROLE.admin), 
  CouponControllers.deleteCoupon
);

export const CouponRoutes = router;
