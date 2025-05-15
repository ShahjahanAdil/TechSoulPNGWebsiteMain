const express = require("express")
const router = express.Router()

const imagesModel = require('../models/images')

router.get("/fetch-tab-images", async (req, res) => {
    try {
        const category = req.query.category
        const limit = 6

        const imgs = await imagesModel.find({category}).sort({ createdAt: -1 }).limit(limit)

        return res.status(200).json({ message: "Images fetched successfully!", imgs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/images", async (req, res) => {
    try {
        const imageID = req.query.imageID

        const img = await imagesModel.findOne({imageID})

        return res.status(200).json({ message: "Image fetched successfully!", img })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router