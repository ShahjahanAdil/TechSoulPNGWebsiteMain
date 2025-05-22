const express = require("express")
const router = express.Router()

const imagesModel = require("../models/images")
const authModel = require("../models/auth")
const downloadsModel = require("../models/downloads")
const subscriptionsModel = require("../models/subscriptions")

router.get("/dashboard", async (req, res) => {
    try {
        const [
            imagesCount,
            usersCount,
            premiumDownloadsAgg,
            revenueAgg,
            recentUploads,
            topUsers
        ] = await Promise.all([
            imagesModel.countDocuments(),
            authModel.countDocuments({ status: 'active' }),
            authModel.aggregate([
                {
                    $group: { _id: null, total: { $sum: "$premiumDownloads" } }
                }]),
            subscriptionsModel.aggregate([
                { $match: { status: "success" } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            imagesModel.find().sort({ createdAt: -1 }).limit(3),
            authModel.find().sort({ downloads: -1 }).limit(3)
        ])

        const allData = {
            imagesCount,
            usersCount,
            premiumDownloadsCount: premiumDownloadsAgg[0]?.total || 0,
            totalRevenue: revenueAgg[0]?.total || 0,
            recentUploads,
            topUsers
        }

        return res.status(200).json({ message: "Data fetched!", allData })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/dashboard/chart", async (req, res) => {
    try {
        // Get uploads per day
        const uploads = await imagesModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get downloads per day
        const downloads = await downloadsModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    totalDownloads: { $sum: 1 }
                }
            }
        ]);

        // Combine data into a daily map
        const dailyMap = {};

        uploads.forEach(item => {
            const date = `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`;
            if (!dailyMap[date]) dailyMap[date] = { date, uploads: 0, downloads: 0 };
            dailyMap[date].uploads = item.count;
        });

        downloads.forEach(item => {
            const date = `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`;
            if (!dailyMap[date]) dailyMap[date] = { date, uploads: 0, downloads: 0 };
            dailyMap[date].downloads = item.totalDownloads;
        });

        // Group by month
        const monthlyGrouped = {};

        Object.values(dailyMap).forEach(entry => {
            const monthKey = entry.date.slice(0, 7); // "YYYY-MM"
            if (!monthlyGrouped[monthKey]) monthlyGrouped[monthKey] = [];
            monthlyGrouped[monthKey].push(entry);
        });

        // Sort each month's data by date
        Object.keys(monthlyGrouped).forEach(month => {
            monthlyGrouped[month].sort((a, b) => new Date(a.date) - new Date(b.date));
        });

        return res.status(200).json({ message: "Chart data fetched", data: monthlyGrouped });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router