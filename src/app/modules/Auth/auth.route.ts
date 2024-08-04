import express from "express";

const router = express.Router();

router.post("/signup");
router.post("/login");

export const AuthRoutes = router;
