import cloudinary from "cloudinary";
import hotelModel from "../models/hotelModel.js";
import ErrorHandler from "../utils/error.handler.js";
class MyHotelController {
  async uploadAssest(req, res, next) {
    try {
      const imageFiles = req.files;
      const newHotel = req.body;
      const uploadPromise = imageFiles.map(async (image) => {
        const base64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = "data:" + image.mimetype + ";base64," + base64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromise);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      const hotel = new hotelModel(newHotel);
      const hotelSaved = await hotel.save();
      return res.status(201).send(hotelSaved);
    } catch (error) {
      console.log("Error while creating hotel:", error);
      return next(error);
    }
  }
  async getHotel(req, res, next) {
    try {
      const hotels = await hotelModel.find({ userId: req.userId });
      return res.status(200).send(hotels);
    } catch (error) {
      return next(error);
    }
  }
  async getHotelById(req, res, next) {
    try {
      const hotel = await hotelModel.findOne({
        _id: req.params.hotelId,
        userId: req.userId,
      });
      return res.status(200).send(hotel);
    } catch (error) {
      return next(error);
    }
  }
  async updateHotel(req, res, next) {
    try {
      const updateHotel = req.body;
      updateHotel.lastUpdated = new Date();
      const hotel = await hotelModel.findOneAndUpdate(
        { _id: req.params.hotelId, userId: req.userId },
        updateHotel,
        { new: true }
      );
      if (!hotel) {
        return next(ErrorHandler(404, "Hotel not found"));
      }

      const files = req.files;
      // const updatedImageUrls=await uploadImages(files)
      // console.log(req.files)
      const uploadPromise = files?.map(async (image) => {
        const base64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = "data:" + image.mimetype + ";base64," + base64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const updateImageUrls = await Promise.all(uploadPromise);
      hotel.imageUrls = [...updateImageUrls, ...(updateHotel.imageUrls || [])];
      const savedHotel = await hotel.save();
      return res.status(201).send(savedHotel);
    } catch (error) {
      return next(error);
    }
  }
  
}
// const uploadImages=async (imageFiles)=>{
//   const uploadPromise = imageFiles.map(async (image) => {
//     const base64 = Buffer.from(image.buffer).toString("base64");
//     const dataURI = "data:" + image.mimetype + ";base64," + base64;
//     const res = await cloudinary.v2.uploader.upload(dataURI);
//     return res.url;
//   });

//   const imageUrls = await Promise.all(uploadPromise);
//   return imageUrls
// }
export default new MyHotelController();
 