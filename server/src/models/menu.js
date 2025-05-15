const mongoose = require("mongoose")
const { Schema } = mongoose

const menuSchema = new Schema({
    item: { type: String, required: true },
    subItems: { type: [String] },
    order: { type: Number }
}, { timestamps: true })

const menuModel = mongoose.models.menu || mongoose.model("menu", menuSchema)

module.exports = menuModel