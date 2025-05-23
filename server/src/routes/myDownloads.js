const express = require("express")
const router = express.Router()

const downloadsModel = require('../models/downloads')

router.get("/downloads", async (req, res) => {
    try {
        const userID = req.query.userID
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const userDownloads = await downloadsModel.find({ userID }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalDownloads = await downloadsModel.countDocuments({ userID })

        return res.status(200).json({ message: "Downloads fetched successfully!", userDownloads, totalDownloads })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router