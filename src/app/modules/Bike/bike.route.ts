import express from "express";
import { BikeControllers } from "./bike.controller";
import { BikeValidations } from "./bike.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/",
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike
);

router.get("/", BikeControllers.getAllBikes);

router.put(
  "/:id",
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete("/:id", BikeControllers.deleteBike);

export const BikeRoutes = router;
