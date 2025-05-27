const express = require("express")
const router = express.Router()
const moment = require("moment");

const authModel = require("../models/auth");
const imagesModel = require('../models/images')
const downloadsModel = require("../models/downloads")

router.get("/image", async (req, res) => {
    try {
        const imageID = req.query.imageID

        const img = await imagesModel.findOne({ imageID })

        return res.status(200).json({ message: "Image fetched successfully!", img })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/similar-images", async (req, res) => {
    try {
        const imageCategory = req.query.imageCategory

        const searchQuery = {
            $or: [
                { title: { $regex: imageCategory, $options: "i" } },
                { description: { $regex: imageCategory, $options: "i" } },
                { category: { $regex: imageCategory, $options: "i" } },
                { subcategory: { $regex: imageCategory, $options: "i" } },
                { tags: { $elemMatch: { $regex: imageCategory, $options: "i" } } }
            ]
        }

        const similarImgs = await imagesModel.find(searchQuery).sort({ createdAt: -1 }).limit(10)

        return res.status(200).json({ message: "Similar Images fetched successfully!", similarImgs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/image/download/:imageID", async (req, res) => {
    try {
        const userID = req.body.userID
        const user = await authModel.findOne({ userID })
        const imageID = req.params.imageID
        const imageURL = req.query.imageURL

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        const today = moment().startOf("day")
        const lastDownload = user.lastDownloadDate ? moment(user.lastDownloadDate).startOf("day") : null

        if (!lastDownload || !today.isSame(lastDownload)) {
            user.dailyDownloadCount = 0
            user.lastDownloadDate = new Date()
        }

        const isPremium = user.plan === "premium"
        const dailyLimit = isPremium ? 50 : 10

        if (user.dailyDownloadCount >= dailyLimit) {
            return res.status(403).json({ message: "Daily download limit reached." })
        }

        user.dailyDownloadCount += 1

        if (isPremium) user.premiumDownloads += 1
        else user.freeDownloads += 1
        user.downloads += 1

        await user.save()

        await downloadsModel.create({ userID, imageID, imageURL })

        return res.status(200).json({ message: "Image downloaded.", remainingDownloads: dailyLimit - user.dailyDownloadCount, dailyDownloadCount: user.dailyDownloadCount });

    } catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router