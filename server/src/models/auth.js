const mongoose = require("mongoose")
const { Schema } = mongoose

const authSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    status: { type: String },
    role: { type: String },
    plan: { type: String },
    address: { type: String },
    phone: { type: String },
    downloads: { type: Number },
    freeDownloads: { type: Number, default: 0 },
    premiumDownloads: { type: Number, default: 0 },
    uploads: { type: Number },
    points: { type: Number },
    dailyDownloadCount: { type: Number, default: 0 },
    lastDownloadDate: { type: Date, default: null },
}, { timestamps: true })

const authModel = mongoose.models.users || mongoose.model("users", authSchema)

module.exports = authModel