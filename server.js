const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const SensorReading = require('./models/sensorReadingModel');
const http = require('http'); // Import the HTTP module
// const { saveSensorReading } = require('./controllers/sensorController');
const dbConnect = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  console.log('Server called successfully');
  res.status(200).send('Server called successfully');
});



// Use the controller function to handle POST requests for sensor readings
app.post('/', saveSensorReading);


dbConnect();

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Emit a test message to the client upon connection
  // io.to(socket.id).emit('testMessage', { message: 'Hello from the server!' });

  socket.on("disconnect", async () => {
    console.log("User disconnected:", socket.id);
  });
});




server.listen(PORT, () => {
  console.log(`Server is listening on port ${port}`);
});





// Controller function to save sensor readings
async function saveSensorReading (req, res) {
  try {
    // Extract temperature, humidity, and pressure data from the request body
    const { temperature, humidity, pressure } = req.body;

    // Emit the sensor data to all connected Socket.IO clients
    // io.emit('message', { temperature, humidity, pressure });
    io.emit('message', { temperature : "Hello From..........." });

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
