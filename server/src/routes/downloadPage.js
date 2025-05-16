const express = require("express")
const router = express.Router()

const imagesModel = require('../models/images')

router.get("/image", async (req, res) => {
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