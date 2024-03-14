const SensorReading = require('../models/sensorReadingModel');

// Controller function to save sensor readings
exports.saveSensorReading= async (req, res) => {
    try {
        // Extract temperature, humidity, and pressure data from the request body
        const { temperature, humidity, pressure } = req.body;

        // Create a new sensor reading document
        const sensorReading = new SensorReading({
            temperature,
            humidity,
            pressure
        });

        // Save the sensor reading to the database
        await sensorReading.save();
        console.log("Saved",temperature);

        // Send a success response
        res.status(201).json({ message: 'Sensor reading saved successfully' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error saving sensor reading:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};


