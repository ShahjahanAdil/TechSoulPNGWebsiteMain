const express = require("express")
const router = express.Router()

const menuModel = require('../models/menu')

router.get("/items", async (req, res) => {
    try {
        const items = await menuModel.find().sort({ order: 1 })

        return res.status(200).json({ message: "Items fetched!", items })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/create-item", async (req, res) => {
    try {
        const newItem = req.body

        const { item } = newItem
        const existing = await menuModel.findOne({ item: item.toLowerCase() })
        if (existing) {
            return res.status(400).json({ message: "Menu item already exists" })
        }

        const newitem = await menuModel.create(newItem)

        return res.status(201).json({ message: "New item added to menu!", newitem })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/update-item", async (req, res) => {
    try {
        const updatingItem = req.body
        const { _id, item, order } = updatingItem

        await menuModel.findOneAndUpdate({ _id }, { item, order }, { new: true })

        return res.status(202).json({ message: "Menu item updated!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/delete-item/:delItemID", async (req, res) => {
    try {
        const { delItemID } = req.params
        await menuModel.findOneAndDelete({ _id: delItemID })

        const remainingItems = await menuModel.find({}).sort("order")

        await menuModel.bulkWrite(
            remainingItems.map((item, index) => ({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: { order: index + 1 } },
                },
            }))
        )

        return res.status(203).json({ message: "Menu item deleted!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/add-subitem", async (req, res) => {
    try {
        const { _id, subItem } = req.body

        await menuModel.findOneAndUpdate({ _id }, { $addToSet: { subItems: subItem } }, { new: true })

        return res.status(201).json({ message: "Subitem added!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/delete-subitem", async (req, res) => {
    try {
        const { _id, subItm } = req.body

        await menuModel.findOneAndUpdate({ _id }, { $pull: { subItems: subItm } }, { new: true })

        return res.status(202).json({ message: "Sub-item removed!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router