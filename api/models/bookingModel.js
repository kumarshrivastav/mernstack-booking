import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: String, required: true },
  childCount: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  description:{type:String,required:true},
  totalCost: { type: Number, required: true },
});

const bookingModel =
  mongoose.models.bookings || mongoose.model("bookings", bookingSchema);
export default bookingModel;
