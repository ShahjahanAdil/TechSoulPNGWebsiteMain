const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const authModel = require('../models/auth')

router.patch("/profile/update-profile", async (req, res) => {
    try {
        const state = req.body
        const { userID, username, email, address, phone, oldPassword, newPassword } = state

        const user = await authModel.findOne({ userID })
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        if (!oldPassword || !newPassword) {
            await authModel.findOneAndUpdate({ userID },
                {
                    username,
                    email,
                    address,
                    phone
                },
                { new: true })
        } else {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password doesn't match!" });
            }

            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            await authModel.findOneAndUpdate(
                { userID },
                { username, email, address, phone, password: newHashedPassword },
                { new: true }
            );
        }

        return res.status(202).json({ message: "User details updated!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router