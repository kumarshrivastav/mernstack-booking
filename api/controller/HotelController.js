import { validationResult } from "express-validator";
import hotelModel from "../models/hotelModel.js";
import constructSearchQuery from "../utils/constructedQuery.js";
import ErrorHandler from "../utils/error.handler.js";

class HotelController {
  async getHotelSearch(req, res, next) {
    try {
      const query = constructSearchQuery(req.query);
      let sortOptions = {};
      switch (req.query.sortOption) {
        case "starRating":
          sortOptions = { starRating: -1 };
          break;
        case "pricePerNightAsc":
          sortOptions = { pricePerNight: 1 };
          break;
        case "pricePerNightDesc":
          sortOptions = { pricePerNight: -1 };
          break;
      }

      const pageSize = 5;
      const pageNumber = parseInt(
        req.query.page ? req.query.page.toString() : "1"
      );
      // {'$or': [ { city: /bhopal/i }, { country: /bhopal/i } ],adultCount:{$gte:2},pricePerNight: { $lte: '2999' }}
      const skip = (pageNumber - 1) * pageSize;
      const hotels = await hotelModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);
      const total = await hotelModel.countDocuments(query);
      // console.log(hotels)
      const response = {
        data: hotels,
        pagination: {
          total:total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      return next(error);
    }
  }
  async findHotelById(req,res,next){
    try {
      const errors=validationResult(req)
      if(!errors.isEmpty()){
        return next(ErrorHandler(400,errors.array()))
      }
      const hotelId=req.params.hotelId.toString()
      const hotel=await hotelModel.findById(hotelId)
      return res.status(200).send(hotel)
    } catch (error) {
      return next(error)
    }
  }
}

export default new HotelController();
