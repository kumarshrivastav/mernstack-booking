import express from "express"
import HotelController from "../controller/HotelController.js"
const router =express.Router()
router.get("/search",HotelController.getHotelSearch)
export default router