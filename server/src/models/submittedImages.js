const mongoose = require("mongoose")
const { Schema } = mongoose

const submittedImagesSchema = new Schema({
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
}, { timestamps: true })

const submittedImagesModel = mongoose.models.submittedimages || mongoose.model("submittedimages", submittedImagesSchema)

module.exports = submittedImagesModel