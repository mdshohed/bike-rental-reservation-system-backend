"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const bike_route_1 = require("../modules/Bike/bike.route");
const rental_route_1 = require("../modules/Rental/rental.route");
const user_route_1 = require("../modules/User/user.route");
const stripe_route_1 = require("../modules/Stripe/stripe.route");
const coupon_route_1 = require("../modules/Coupon/coupon.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/bikes",
        route: bike_route_1.BikeRoutes,
    },
    {
        path: "/rentals",
        route: rental_route_1.RentalRoutes,
    },
    {
        path: "/coupons",
        route: coupon_route_1.CouponRoutes,
    },
    {
        path: "/create-payment-intent",
        route: stripe_route_1.StripeRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
