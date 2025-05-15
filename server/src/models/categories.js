const mongoose = require("mongoose")
const { Schema } = mongoose

const categoriesSchema = new Schema({
    category: { type: String, required: true },
    subcategories: { type: [String] },
}, { timestamps: true })

const categoriesModel = mongoose.models.categories || mongoose.model("categories", categoriesSchema)

module.exports = categoriesModel