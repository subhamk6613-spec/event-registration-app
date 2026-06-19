const express = require("express");

const {
    registerForEvent,
    getEventRegistrations,
} = require("../controllers/registrationController");

const router = express.Router();

// Register for an event
router.post("/:id/register", registerForEvent);

// Get all registrations for an event
router.get("/:id/registrations", getEventRegistrations);

module.exports = router;