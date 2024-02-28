import express from 'express'
import verifyToken from "../middleware/verifyToken.js"
import MyBookingController from '../controller/MyBookingController.js'
const router=express.Router()


router.get('/booking',verifyToken,MyBookingController.booking)

export default router