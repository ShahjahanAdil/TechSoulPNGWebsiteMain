const mongoose = require("mongoose")
const { Schema } = mongoose

const contributorsSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String },
    role: { type: String },
    plan: { type: String },
    address: { type: String },
    phone: { type: String },
}, { timestamps: true })

const contributorsModel = mongoose.models.contributors || mongoose.model("contributors", contributorsSchema)

module.exports = contributorsModel