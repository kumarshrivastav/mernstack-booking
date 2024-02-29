import hotelModel from "../models/hotelModel.js";
class MyBookingController {
  async booking(req, res, next) {
    try {
      const hotels = await hotelModel.find({
        bookings: { $elemMatch: { userId: req.userId } },
      });
      const results=hotels.map((hotel)=>{
        const userBookings=hotel.bookings.filter((booking)=>booking.userId===req.userId)
        const hotelWithUserBookings={
            ...hotel.toObject(),
            bookings:userBookings
        }
        return hotelWithUserBookings;
    })
      return res.status(200).send(hotels)
    } catch (error) {
      return next(error);
    }
  }
}

export default new MyBookingController();
