const jwt = require("jsonwebtoken")

const verfiyToken = (req, res, next) => {

    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]

    jwt.verify(token, "secret-key", (err, result) => {
        if (!err) {
            req.userID = result.userID
            next()
        }
        else {
            return res.status(401).json({ message: "Invalid token!" })
        }
    })
}

module.exports = verfiyToken