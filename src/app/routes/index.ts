import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { BikeRoutes } from "../modules/Bike/bike.route";
import { RentalRoutes } from "../modules/Booking/booking.route";


const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: AuthRoutes,
  },
  {
    path: "/bikes",
    route: BikeRoutes,
  },
  {
    path: "/rentals",
    route: RentalRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
