const mongoose = require("mongoose")
const { Schema } = mongoose

const favouritesSchema = new Schema({
    userID: { type: String, required: true },
    imageID: { type: String, required: true },
    imageURL: { type: String, required: true, unique: true },
    favourite: { type: Boolean },
    license: { type: String },
}, { timestamps: true })

const favouritesModel = mongoose.models.favourites || mongoose.model("favourites", favouritesSchema)

module.exports = favouritesModel