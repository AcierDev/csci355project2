const { Event, User, Rsvp } = require('../models/eventModel');

// Create a Local Event
const createLocalEvent = async (eventData) => {
    const event = new Event(eventData);
    return await event.save();
};

// Retrieve User-saved Events
const getUserSavedEvents = async (userId) => {
    return await User.findById(userId).populate('savedEvents');
};

// Save RSVP Data
const createRSVP = async (userId, eventId, status) => {
    const rsvp = new Rsvp({ userId, eventId, rsvpStatus: status });
    return await rsvp.save();
};

// Delete Event
const deleteEvent = async (eventId) => {
    return await Event.findByIdAndDelete(eventId);
};

module.exports = { createLocalEvent, getUserSavedEvents, createRSVP, deleteEvent };
