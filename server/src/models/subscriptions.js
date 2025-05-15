const mongoose = require("mongoose")
const { Schema } = mongoose

const subscriptionsSchema = new Schema({
    sID: { type: String, required: true, unique: true },
    userID: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: String },
    amount: { type: Number },
    status: { type: String },
}, { timestamps: true })

const subscriptionsModel = mongoose.models.subscriptions || mongoose.model("subscriptions", subscriptionsSchema)

module.exports = subscriptionsModel