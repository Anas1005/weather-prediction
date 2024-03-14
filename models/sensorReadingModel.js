const mongoose = require('mongoose');

// Define schema for sensor readings
const sensorReadingSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Create a model for sensor readings
const SensorReading = mongoose.model('SensorReading', sensorReadingSchema);

module.exports = SensorReading;
