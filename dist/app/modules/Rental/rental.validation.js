"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRentalValidationSchema = void 0;
const zod_1 = require("zod");
// const timeStringSchema = z.string().refine(
//   (time) => {
//     const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
//     return regex.test(time);
//   },
//   {
//     message: 'Invalid time format , expected "HH:MM" in 24 hours format',
//   },
// );
exports.createRentalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string(),
        startTime: zod_1.z.string(),
        totalPaid: zod_1.z.number(),
        discount: zod_1.z.number().optional()
    }),
});
