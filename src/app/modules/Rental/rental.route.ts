import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RentalControllers } from "./rental.controller";
import { createRentalValidationSchema } from "./rental.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createRentalValidationSchema),
  RentalControllers.createRental
);

router.get(
  "/", 
  RentalControllers.getAllRentals
);

router.put(
  "/:id/return",
  RentalControllers.returnBike,
);

export const RentalRoutes = router;
