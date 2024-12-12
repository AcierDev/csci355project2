const express = require('express');
const connectDB = require('./config/dbConnection');
const { createRSVP } = require('./services/eventServices');
const { Event } = require('./models/eventModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Endpoint to Fetch Events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Endpoint for RSVPs
app.post('/api/rsvp', async (req, res) => {
    const { userId, eventId, status } = req.body;
    try {
        const rsvp = await createRSVP(userId, eventId, status);
        res.status(201).json(rsvp);
    } catch (err) {
        res.status(500).json({ error: 'Failed to RSVP' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
