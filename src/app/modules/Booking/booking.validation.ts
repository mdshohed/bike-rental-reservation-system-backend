import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

export const createRentalValidationSchema = z.object({
  body: z.object({
    bikeId: z.string(),
    startTime: timeStringSchema,
  }),
});

// export const udpateRentalValidationSchema = z.object({
//   body: z.object({
//     userId: z.string().optional(),
//     bikeId: z.string().optional(),
//     startTime: z.string().optional(),
//     returnTime: z.string().optional(),
//     totalCost: z.string().optional(),
//     isReturned: z.string().optional(),
//   }),
// });
