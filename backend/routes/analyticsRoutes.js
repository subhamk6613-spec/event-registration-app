const express = require("express");

const {
    trackEvent,
    getAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

router.post("/", trackEvent);
router.get("/", getAnalytics);

module.exports = router;