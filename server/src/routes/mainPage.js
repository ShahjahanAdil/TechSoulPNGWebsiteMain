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
        const category = req.query.category;
        const page = parseInt(req.query.page) || 1;
        const limit = 25;
        const skip = (page - 1) * limit;

        let searchQuery = {};
        if (category) {
            searchQuery = {
                $or: [
                    { title: { $regex: category, $options: "i" } },
                    { description: { $regex: category, $options: "i" } },
                    { category: { $regex: category, $options: "i" } },
                    { subcategory: { $regex: category, $options: "i" } },
                    { tags: { $elemMatch: { $regex: category, $options: "i" } } }
                ]
            };
        }

        const imgs = await imagesModel.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalImgs = await imagesModel.countDocuments(searchQuery);

        return res.status(200).json({ message: "Images fetched successfully!", imgs, totalImgs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// router.get("/main/fetch-images", async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1
//         const limit = 25
//         const skip = (page - 1) * limit

//         const imgs = await imagesModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
//         const totalImgs = await imagesModel.countDocuments()

//         return res.status(200).json({ message: "Images fetched successfully!", imgs, totalImgs })
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Internal server error" })
//     }
// })

// router.get("/main/fetch-images/:category", async (req, res) => {
//     try {
//         const category = req.params.category
//         const page = parseInt(req.query.page) || 1
//         const limit = 25
//         const skip = (page - 1) * limit

//         const searchQuery = {
//             $or: [
//                 { title: { $regex: category, $options: "i" } },
//                 { description: { $regex: category, $options: "i" } },
//                 { category: { $regex: category, $options: "i" } },
//                 { subcategory: { $regex: category, $options: "i" } },
//                 { tags: { $elemMatch: { $regex: category, $options: "i" } } }
//             ]
//         }

//         const imgs = await imagesModel.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit)
//         const totalImgs = await imagesModel.countDocuments(searchQuery)

//         return res.status(200).json({ message: "Images fetched successfully!", imgs, totalImgs })
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Internal server error" })
//     }
// })

module.exports = router