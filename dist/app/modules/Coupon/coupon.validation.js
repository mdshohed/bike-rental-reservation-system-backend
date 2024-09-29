"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidations = void 0;
const zod_1 = require("zod");
const createCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        couponCode: zod_1.z.string(),
        percentage: zod_1.z.number(),
    }),
});
const updateCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        couponCode: zod_1.z.string().optional(),
        percentage: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.CouponValidations = {
    createCouponValidationSchema,
    updateCouponValidationSchema,
};
