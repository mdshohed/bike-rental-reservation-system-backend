import express from "express";

const router = express.Router();

router.post("/login");

router.post("/change-password");

router.post("/refresh-token");

export const AuthRoutes = router;
