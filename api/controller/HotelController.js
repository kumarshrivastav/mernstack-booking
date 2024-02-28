import { validationResult } from "express-validator";
import hotelModel from "../models/hotelModel.js";
import constructSearchQuery from "../utils/constructedQuery.js";
import userModel from "../models/user.js"
import ErrorHandler from "../utils/error.handler.js";
import Stripe from "stripe";
const stripe=new Stripe('sk_test_51Oo1B7SE8GUpcmyihjsq4mDqlg9p3Qc95qCWztdY2iD6l5e0VeUfND5P8MgN8gwiFiwzW3BGdy2Cdv4r0JPQoKTJ008DgfMRD8')
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
  async createPaymentIntent(req,res,next){
    // 1.totalCost
    // 2.hotelId
    // 3.userId
    try {
      // console.log(req.body)
      const {numberOfNights}=req.body
      const hotelId=req.params.hotelId
      const user=await userModel.findById(req.userId)
      const hotel=await hotelModel.findById(hotelId)
      if(!hotel){
        return next(ErrorHandler(400,'Hotel Not Found'))
      }

      const totalCost=hotel.pricePerNight*numberOfNights;
      const customer=await stripe.customers.create({
        name:user.firstName+' '+user.lastName,
        address:{
          line1:hotel.city,
          line2:hotel.country,
          postal_code:'89834',
          city:hotel.city,
          state:'Madhya Pradesh',
          country:hotel.country
        }
      })
      console.log(customer)
      const paymentIntent=await stripe.paymentIntents.create({
        description:'Hotel Booking with Stripe payment gateway',
        amount:totalCost*100,
        currency: 'inr',
        payment_method_types:['card'],       
        metadata:{
          hotelId,userId:req.userId
        },
      })
      
      if(!paymentIntent.client_secret){
        return next(ErrorHandler(500,'Error Creating Payment Intent'))
      }
      console.log(paymentIntent)
      const response={
        paymentIntentId:paymentIntent.id,
        clientSecret:paymentIntent.client_secret,
        totalCost,
      }
      return res.status(200).send(response)
    } catch (error) {  
      return next(error)
    }
  }
  async hotels(req,res,next){
    try {
      const hotels=await hotelModel.find().sort('-lastUpdated')
      return res.status(200).send(hotels)
    } catch (error) {
      return next(error)
    }
  }
  async hotelBooking(req,res,next){
    try {
      console.log(req.body)
      const paymentIntentId=req.body.paymentIntentId
      const paymentIntent=await stripe.paymentIntents.retrieve(paymentIntentId)
      if(!paymentIntent){
        return next(ErrorHandler(400,'payment intent not found'))
      }
      if(paymentIntent.metadata.hotelId !==req.params.hotelId || paymentIntent.metadata.userId !== req.userId){
        return next(ErrorHandler(400,'payment intent mismatch'))
      }
      if(paymentIntent.status !=='succeeded'){
        return next(ErrorHandler(400,`payment intent not succeeded. Status: ${paymentIntent.status}`))
      }
      const newBooking={
        ...req.body,userId:req.userId
      }
      const hotel=await hotelModel.findOneAndUpdate({_id:req.params.hotelId},{
        $push:{bookings:newBooking}
      })
      if(!hotel){
        return next(ErrorHandler(400,'hotel not found'))
      }
      await hotel.save()
      return res.status(200).send()
    } catch (error) {
      return next(error)
    }
  }
}

export default new HotelController();
