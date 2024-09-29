import { z } from "zod";

const createCouponValidationSchema = z.object({
  body: z.object({
    couponCode: z.string(),
    percentage: z.number(),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    couponCode: z.string().optional(),
    percentage: z.number().optional(),
    isAvailable: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CouponValidations = {
  createCouponValidationSchema,
  updateCouponValidationSchema,
};
