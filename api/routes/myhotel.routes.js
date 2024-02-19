// const express = require("express");
import express from "express";
// const MyHotelController = require("../controller/MyHotelController");
import MyHotelController from "../controller/MyHotelController.js"
const router = express.Router();
// const multer = require("multer");
import multer from "multer";
// const verifyToken = require("../middleware/verifyToken");
import verifyToken from "../middleware/verifyToken.js"
// const { body } = require("express-validator");
import { body } from "express-validator";
const hotelExpressValidator = [
  body("name").notEmpty().withMessage("Name is Required"),
  body("city").notEmpty().withMessage("Ciry is Required"),
  body("country").notEmpty().withMessage("Country is Required"),
  body("description").notEmpty().withMessage("Description is Required"),
  body("type").notEmpty().withMessage("Hotel Type is Required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price Per Night Required and to be Number"),
  body("facilities")
    .isArray()
    .notEmpty()
    .withMessage("Facilities are required"),
];
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post(
  "/add-hotel",
  hotelExpressValidator,
  verifyToken,
  upload.array("imageFiles", 6),
  MyHotelController.uploadAssest
);
router.get("/get-hotel",verifyToken,MyHotelController.getHotel)

// module.exports = router;
export default router
