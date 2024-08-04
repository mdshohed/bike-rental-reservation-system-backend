import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserValidationSchema } from "./user.validation";

const router = express.Router(); 

router.get('/me',
  UserControllers.getProfile
);

router.put('/me',
  validateRequest(updateUserValidationSchema),
  UserControllers.updateProfile
);

export const UserRoutes = router; 