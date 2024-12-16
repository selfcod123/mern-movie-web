//---File  15 Back
import mongoose from "mongoose"; 

import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoriteModel({
        ...req.body,
        user: req.user.id
    });


    await favorite.save();

    responseHandler.created(res, favorite);
} catch {
    responseHandler.error(res);
  }
};

//************** ReMOVIE FAVORITE */
const removeFavorite = async (req, res) => {
    try {
      console.log("removeFavorite called. User:", req.user.id, "FavoriteId:", req.params.favoriteId);

      const { favoriteId } = req.params;

      // Validate favoriteId format
      if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
        console.error("Invalid favoriteId:", favoriteId);
        return responseHandler.badrequest(res, "Invalid favoriteId");
      }

      // Check if the favorite exists
      const favorite = await favoriteModel.findOne({
        user: req.user.id,
        _id: favoriteId
      });

      if (!favorite) {
        console.error("Favorite not found for user:", req.user.id, "with ID:", favoriteId);
        return responseHandler.notfound(res);
      }

      console.log("Favorite found. Deleting...");
      // Use deleteOne or findByIdAndDelete
      await favoriteModel.deleteOne({ _id: favoriteId });

      console.log("Favorite successfully deleted.");
      responseHandler.ok(res, { message: "Favorite removed successfully" });
    } catch (error) {
      console.error("Error in removeFavorite:", error.message || error);
      responseHandler.error(res, error);
    }
  };


//***********************
const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
