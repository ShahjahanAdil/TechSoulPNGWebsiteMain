const express = require("express")
const router = express.Router()

const imagesModel = require('../models/images')
const categoriesModel = require('../models/categories')

router.get("/home/fetch-categories", async (req, res) => {
    try {
        const cats = await categoriesModel.find().limit(9)

        return res.status(200).json({ message: "Categories fetched successfully!", cats })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/fetch-tab-images", async (req, res) => {
    try {
        const category = req.query.category
        const limit = 6

        const imgs = await imagesModel.find({ category }).sort({ createdAt: -1 }).limit(limit)

        return res.status(200).json({ message: "Images fetched successfully!", imgs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router