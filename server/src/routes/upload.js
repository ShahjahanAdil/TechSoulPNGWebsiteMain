const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const imagesModel = require("../models/images")

const generateRandomID = () => Math.random().toString(32).slice(2)

router.post("/upload-image", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or invalid file type!" });
    }

    const formData = req.body
    const fileUrl = `/uploads/${req.file.filename}`;
    const parsedTags = JSON.parse(req.body.tags || '[]');

    const imageData = {
        ...formData,
        imageID: generateRandomID(),
        imageURL: fileUrl,
        type: req.file.mimetype.split("/").pop(),
        tags: parsedTags,
        status: "published",
    }

    await imagesModel.create(imageData)

    res.status(201).json({ message: "Image uploaded successfully" });
});

module.exports = router;