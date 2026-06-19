const Event = require("../models/event");
const Registration = require("../models/registration");

const getDashboardStats = async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();

        const totalRegistrations = await Registration.countDocuments();

        const recentRegistrations = await Registration.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const registrationsPerEvent = await Registration.aggregate([
            {
                $group: {
                    _id: "$eventId",
                    registrations: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            totalEvents,
            totalRegistrations,
            registrationsPerEvent,
            recentRegistrations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};
