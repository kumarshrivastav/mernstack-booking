import express from "express"
import HotelController from "../controller/HotelController.js"
import { param } from "express-validator"
const router =express.Router()
router.get("/search",HotelController.getHotelSearch)
router.get("/hotel/:hotelId",[param('hotelId').notEmpty().withMessage('Hotel Id is required')],HotelController.findHotelById)
export default router