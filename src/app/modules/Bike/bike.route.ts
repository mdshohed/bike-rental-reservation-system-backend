import express from "express";
import { BikeControllers } from "./bike.controller";
import { BikeValidations } from "./bike.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);

router.get("/", BikeControllers.getAllBikes);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete("/:id", 
  auth(USER_ROLE.admin), 
  BikeControllers.deleteBike
);

export const BikeRoutes = router;
