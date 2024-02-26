import express from "express"
import Stripe from "stripe"
import HotelController from "../controller/HotelController.js"
import { param } from "express-validator"
import verifyToken from "../middleware/verifyToken.js"
const router =express.Router()  
router.get("/search",HotelController.getHotelSearch)
router.get("/hotel/:hotelId",[param('hotelId').notEmpty().withMessage('Hotel Id is required')],HotelController.findHotelById)
router.post('/:hotelId/bookings/create-payment-intent',verifyToken,HotelController.createPaymentIntent)
router.post("/:hotelId/bookings",verifyToken,HotelController.hotelBooking)
export default router