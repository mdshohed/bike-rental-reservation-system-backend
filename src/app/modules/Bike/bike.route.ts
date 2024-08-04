import express from "express";

const router = express.Router();

router.post("/", AdminControllers.getAllAdmins);

router.get("/", AdminControllers.getSingleAdmin);

router.put(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete("/:id", AdminControllers.deleteAdmin);

export const BikeRoutes = router;
