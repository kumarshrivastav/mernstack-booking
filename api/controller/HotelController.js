import hotelModel from "../models/hotelModel.js";

class HotelController {
  async getHotelSearch(req, res, next) {
    try {
      const pageSize = 5;
      const pageNumber = parseInt(
        req.query.page ? req.query.page.toString() : "1"
      );
      const skip = (pageNumber - 1) * pageSize;
      const hotels = await hotelModel.find().skip(skip).limit(pageSize);
      const total = await hotelModel.countDocuments();
      const response = {
        data: hotels,
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      return next(error);
    }
  }
}

export default new HotelController();
