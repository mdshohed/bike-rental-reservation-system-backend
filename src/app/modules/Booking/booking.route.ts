import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/", BookingControllers.createRental);

router.get("/", BookingControllers.getAllRentals);

router.put(
  "/:id/return",
  // validateRequest(),
  BookingControllers.returnBike,
);

// router.delete("/:id", BikeControllers.deleteBike);

export const RentalRoutes = router;
