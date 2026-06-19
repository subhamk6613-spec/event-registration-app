const Analytics = require("../models/Analytics");

const trackEvent = async (req, res) => {
    try {
        const { eventName, payload } = req.body;

        const analytics = await Analytics.create({
            eventName,
            payload,
        });

        res.status(201).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: analytics.length,
            data: analytics,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    trackEvent,
    getAnalytics,
};