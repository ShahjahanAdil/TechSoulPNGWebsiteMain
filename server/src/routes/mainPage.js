const express = require("express")
const router = express.Router()

const categoriesModel = require('../models/categories')

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

module.exports = router