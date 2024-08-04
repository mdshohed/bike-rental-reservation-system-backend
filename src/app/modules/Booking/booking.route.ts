import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";
import { createRentalValidationSchema } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createRentalValidationSchema),
  BookingControllers.createRental
);

router.get(
  "/", 
  BookingControllers.getAllRentals
);

router.put(
  "/:id/return",
  BookingControllers.returnBike,
);

export const RentalRoutes = router;
