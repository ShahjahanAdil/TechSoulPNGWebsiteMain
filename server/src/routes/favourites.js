const express = require("express")
const router = express.Router()

const imagesModel = require('../models/images')
const favouritesModel = require('../models/favourites')

router.get("/favourites/get-dashboard", async (req, res) => {
    try {
        const userID = req.query.userID
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const userFavourites = await favouritesModel.find({ userID }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalFavourites = await favouritesModel.countDocuments({ userID })

        return res.status(200).json({ message: "Downloads fetched successfully!", userFavourites, totalFavourites })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/favourites/add", async (req, res) => {
    try {
        const { userID, imageID, imageURL, license } = req.body;

        const existingFav = await favouritesModel.findOne({ userID, imageID });

        if (existingFav) {
            await favouritesModel.findOneAndDelete({ userID, imageID });
            await imagesModel.findOneAndUpdate({ imageID }, { favourite: false }, { new: true });

            return res.status(201).json({ message: "Image removed from favourites!" });
        } else {
            await favouritesModel.create({ userID, imageID, imageURL, favourite: true, license });
            await imagesModel.findOneAndUpdate({ imageID }, { favourite: true }, { new: true });

            return res.status(201).json({ message: "Image added to favourites!" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router