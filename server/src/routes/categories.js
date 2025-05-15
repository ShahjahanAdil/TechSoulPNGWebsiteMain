const express = require("express")
const router = express.Router()

const categoriesModel = require('../models/categories')

router.get("/categories", async (req, res) => {
    try {
        const cats = await categoriesModel.find().sort({ createdAt: -1 })

        return res.status(200).json({ message: "Categories fetched!", cats })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/create-category", async (req, res) => {
    try {
        const newCategory = req.body

        const { category } = newCategory
        const existing = await categoriesModel.findOne({ category: category.toLowerCase() })
        if (existing) {
            return res.status(400).json({ message: "Category already exists" })
        }

        const newCat = await categoriesModel.create(newCategory)

        return res.status(201).json({ message: "New category created!", newCat })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/update-category", async (req, res) => {
    try {
        const updatingCategory = req.body
        const { _id, category } = updatingCategory

        await categoriesModel.findOneAndUpdate({ _id }, { category: category }, { new: true })

        return res.status(202).json({ message: "Category updated!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/delete-category/:delCatID", async (req, res) => {
    try {
        const { delCatID } = req.params
        await categoriesModel.findOneAndDelete({ _id: delCatID })

        return res.status(203).json({ message: "Category deleted!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})


router.post("/add-subcategory", async (req, res) => {
    try {
        const { _id, subcategory } = req.body

        await categoriesModel.findOneAndUpdate({ _id }, { $addToSet: { subcategories: subcategory } }, { new: true })

        return res.status(201).json({ message: "Subcategory added!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/delete-subcategory", async (req, res) => {
    try {
        const { _id, subCat } = req.body

        await categoriesModel.findOneAndUpdate({ _id }, { $pull: { subcategories: subCat } }, { new: true })

        return res.status(202).json({ message: "Subcategory removed!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router