const express = require("express")
const router = express.Router()

const categoriesModel = require('../models/categories')
const imagesModel = require('../models/images')

router.get("/main/fetch-categories", async (req, res) => {
    try {
        const cats = await categoriesModel.find()

        return res.status(200).json({ message: "Categories fetched successfully!", cats })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/main/fetch-images", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 25
        const skip = (page - 1) * limit

        const imgs = await imagesModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalImgs = await imagesModel.countDocuments()

        return res.status(200).json({ message: "Categories fetched successfully!", imgs, totalImgs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router