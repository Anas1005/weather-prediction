const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const SensorReading = require('./models/sensorReadingModel');
const http = require('http');
const axios = require("axios");
const dbConnect = require("./config/database");
const dotenv = require("dotenv");
const cors=require("cors")
dotenv.config();

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const server = http.createServer(app); // Create HTTP server
app.use(cors());
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  
const PORT = process.env.PORT || 4000;


const isProduction = process.env.NODE_ENV === "production";
// const CLIENT_URL = isProduction ? "https://weather-app-frontend-kohl.vercel.app":"http://localhost:3000";


app.get('/', (req, res) => {
  console.log('Server called successfully');
  res.status(200).send('Server called successfully');
});

app.post('/', saveSensorReading);


app.post("/predict", async (req, res) => {
  console.log("Req",req.body);
  try {
    const response = await axios.post(
      "https://flask-weather-v3.onrender.com/predict",
      req.body
    );
    console.log("Response", response.data)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error making prediction");
  }
});

dbConnect();


io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.emit('testMessage', { message: 'Hello from the server!' });
  console.log("Test message emitted to client.");
  socket.on("lol", async (data, callback) => {
    console.log("Lol....", data);
    const dataaa = {message:'Hello CALLBACK...'}
     socket.emit("lolback",{dataaa})
  });


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
    io.emit('sensorData', { temperature, humidity, pressure });
    // io.emit('message', { temperature : "Hello From..........." });

    const sensorReading = new SensorReading({
        temperature,
        humidity,
        pressure
    });

  
    // Save the sensor reading to the database
    await sensorReading.save();
    console.log("Saved",sensorReading);

    // Send a success response
    res.status(201).json({ message: 'Sensor reading saved successfully' });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error('Error saving sensor reading:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};
