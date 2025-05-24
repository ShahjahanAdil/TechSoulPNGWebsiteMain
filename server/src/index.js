const express = require("express")
const cors = require("cors")
const { config } = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
config()

mongoose.connect(process.env.MONGODBURI, { dbName: "techsoulpng" })
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.error(err)
    })

const { PORT = 8000 } = process.env

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

// const imagesModel = require("./models/images")

// async function updateImages() {
//     try {
//         const updateResult = await imagesModel.updateMany(
//             {},
//             {
//                 $set: {
//                     type: 'png'
//                 }
//             }
//         );
//         console.log(`Successfully updated ${updateResult.modifiedCount} images with new fields.`);
//     } catch (error) {
//         console.error("Error updating users:", error);
//     }
// }

// mongoose.connection.once('open', async () => {
//     await updateImages();
// });

const authRouter = require('./routes/auth')
const adminDashboardRouter = require('./routes/adminDashboard')
const usersRouter = require('./routes/users')
const categoriesRouter = require('./routes/categories')
const uploadRouter = require('./routes/upload')
const imagesRouter = require('./routes/images')
const menuRouter = require('./routes/menu')
const homePageRouter = require('./routes/homePage')
const downloadPageRouter = require('./routes/downloadPage')
const mainPageRouter = require('./routes/mainPage')
const profileRouter = require('./routes/profile')
const myDownloadsRouter = require('./routes/myDownloads')
const favouritesRouter = require('./routes/favourites')

app.use('/auth', authRouter)
app.use('/admin', adminDashboardRouter)
app.use('/admin', usersRouter)
app.use('/admin', categoriesRouter)
app.use('/admin', uploadRouter)
app.use('/admin', imagesRouter)
app.use('/admin', menuRouter)
app.use('/frontend', homePageRouter)
app.use('/frontend', downloadPageRouter)
app.use('/frontend', mainPageRouter)
app.use('/dashboard', profileRouter)
app.use('/dashboard', myDownloadsRouter)
app.use('/frontend', favouritesRouter)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));