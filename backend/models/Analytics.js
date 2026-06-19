const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        payload: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Analytics", analyticsSchema);