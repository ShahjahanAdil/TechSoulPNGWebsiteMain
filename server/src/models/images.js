const mongoose = require("mongoose")
const { Schema } = mongoose

const imagesSchema = new Schema({
    imageID: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    tags: { type: [String] },
    status: { type: String },
    license: { type: String },
    favourite: { type: Boolean, default: false }
}, { timestamps: true })

const imagesModel = mongoose.models.images || mongoose.model("images", imagesSchema)

module.exports = imagesModel