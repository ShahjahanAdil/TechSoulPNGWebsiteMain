const mongoose = require("mongoose")
const { Schema } = mongoose

const downloadSchema = new Schema({
    userID: { type: String, required: true },
    imageID: { type: String, required: true },
    imageURL: { type: String, required: true },
}, { timestamps: true })

const downloadsModel = mongoose.models.downloads || mongoose.model("downloads", downloadSchema)

module.exports = downloadsModel