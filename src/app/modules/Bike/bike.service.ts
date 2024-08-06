
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  // const bikeQuery = new QueryBuilder(
  //   Bike.find()
  //   .populate('preRequisiteCourses.course'),
  //   query,
  // )
  //   .search()
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();

  // const result = await bikeQuery.modelQuery;
  const result = await Bike.find();
  return result;
};

const updateBikeFromDB = async (id: string, payload: Partial<TBike>) => {
  
  const result = await Bike.findByIdAndUpdate( { id }, payload, 
    {
      new: true
    }
  );
  return result; 
}

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { isAvailable: false },
    {
      new: true,
    },
  );
  return result;
};


export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeFromDB,
  deleteBikeFromDB,
}