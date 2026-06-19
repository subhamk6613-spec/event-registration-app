const Event = require("../models/event");
const Registration = require("../models/registration");

// Register for Event
const registerForEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, email, phone, organization, source } = req.body;

        // Check event exists
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        // Check seats available
        if (event.availableSeats <= 0) {
            return res.status(400).json({
                success: false,
                message: "No seats available",
            });
        }

        // Check duplicate registration
        const existingRegistration = await Registration.findOne({
            eventId: id,
            email,
        });

        if (existingRegistration) {
            return res.status(400).json({
                success: false,
                message: "You have already registered for this event",
            });
        }

        // Create registration
        const registration = await Registration.create({
            eventId: id,
            name,
            email,
            phone,
            organization,
            source,
        });

        // Reduce seat count
        event.availableSeats -= 1;
        await event.save();

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: registration,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Registrations for a Specific Event
const getEventRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({
            eventId: req.params.id,
        });

        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    registerForEvent,
    getEventRegistrations,
};