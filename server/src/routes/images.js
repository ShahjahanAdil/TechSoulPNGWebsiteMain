const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")

const imagesModel = require('../models/images')

router.get("/fetch-images", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const imgs = await imagesModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalImages = await imagesModel.countDocuments()

        return res.status(200).json({ message: "Images fetched successfully!", imgs, totalImages })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/search-images", async (req, res) => {
    try {
        const searchInput = req.query.searchInput?.trim() || ''
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const searchQuery = {
            $or: [
                { title: { $regex: searchInput, $options: "i" } },
                { description: { $regex: searchInput, $options: "i" } },
                { category: { $regex: searchInput, $options: "i" } },
                { subcategory: { $regex: searchInput, $options: "i" } },
                { license: { $regex: searchInput, $options: "i" } },
                { tags: { $elemMatch: { $regex: searchInput, $options: "i" } } }
            ]
        }

        const searchedImages = await imagesModel.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalSearchedImages = await imagesModel.countDocuments(searchQuery)

        if (searchedImages.length === 0) {
            return res.status(404).json({ message: "No matching images found!" })
        }

        return res.status(200).json({ message: "Images searched successfully!", searchedImages, totalSearchedImages })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/update-image/:imageID", async (req, res) => {
    try {
        const { imageID } = req.params
        const updatingImage = req.body

        await imagesModel.findOneAndUpdate({ imageID }, updatingImage, { new: true });

        return res.status(202).json({ message: "Changes saved!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/delete-image/:imageID", async (req, res) => {
    try {
        const { imageID } = req.params

        const image = await imagesModel.findOne({ imageID })
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        const fileName = image.imageURL?.split("/").pop();
        const filePath = path.join(__dirname, "..", "..", "uploads", fileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await imagesModel.findOneAndDelete({ imageID });

        return res.status(203).json({ message: "Image deleted!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router