import { model, Schema } from "mongoose";
import { TRental } from "./rental.interface";


const RentalSchema = new Schema<TRental>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  bikeId: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Bike',
  },
  startTime: { 
    type: Date, 
    required: true 
  },
  returnTime: { 
    type: Date, 
    // required: true,
  },
  totalCost: { 
    type: Number, 
    required: true 
  },
  isReturned: { 
    type: Boolean, 
    required: true 
  }
},
{
  timestamps: true,
});

// RentalSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery();
//   console.log(this.query.returnTime);
  
//   // const isDepartmentExist = await Rental.findOne(query);

//   // if (!isDepartmentExist) {
//   //   throw new AppError(
//   //     httpStatus.NOT_FOUND,
//   //     'This department does not exist! ',
//   //   );
//   // }

//   next();
// });

// RentalSchema.post('save', async function(doc, next){
//   console.log(doc);
  
//   // next();
// })


export const Rental = model<TRental>("Rental", RentalSchema);
