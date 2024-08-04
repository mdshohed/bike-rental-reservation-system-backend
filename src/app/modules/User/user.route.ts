import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router(); 

router.get('/',
  UserControllers.getProfile
);

router.put('/',
  UserControllers.updateProfile
);

export const UserRoutes = router; 