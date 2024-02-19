import cloudinary from "cloudinary";
import hotelModel from "../models/hotelModel.js";
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
  async getHotel(req,res,next){
    try {
      const hotels=await hotelModel.find({userId:req.userId})
      return res.status(200).send(hotels)
    } catch (error) {
      return next(error)
    }
  }
}
export default new MyHotelController();
