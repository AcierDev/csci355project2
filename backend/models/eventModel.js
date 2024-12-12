const mongoose = require('mongoose');

// Event Schema
const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: {
        type: String,
        coordinates: [Number], // For Google Maps integration
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isLocal: { type: Boolean, default: true },
    image: String, // Store Cloudinary URL
});

const Event = mongoose.model('Event', EventSchema);

// RSVP Schema
const RsvpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    rsvpStatus: { type: String, enum: ['attending', 'interested', 'declined'] },
});

const Rsvp = mongoose.model('Rsvp', RsvpSchema);

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    rsvpHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rsvp' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = { Event, Rsvp, User };
