const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const SensorReading = require('./models/sensorReadingModel');
const jwt = require("jsonwebtoken");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const http = require('http'); // Import the HTTP module
// const { saveSensorReading } = require('./controllers/sensorController');
const dbConnect = require("./config/database");
require("./config/passport")
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
// app.use(passport.authenticate("google", {session:false}));

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
const PORT = process.env.PORT || 4000;


const isProduction = process.env.NODE_ENV === "production";
const CLIENT_URL = isProduction ? "https://weather-app-frontend-27eh7ymx6-anas-saifs-projects.vercel.app":"http://localhost:3000";


app.get('/', (req, res) => {
  console.log('Server called successfully');
  res.status(200).send('Server called successfully');
});

app.get('/success', (req, res) => {
  console.log('Server called successfully');
  res.status(200).send('Server called successfully');
});


app.get('/failure', (req, res) => {
  console.log('LolServer called successfully');
  res.status(401).send('Failed..');
});




// Use the controller function to handle POST requests for sensor readings
app.post('/', saveSensorReading);

// Google OAuth authentication routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session:false }));

app.get('/auth/googleRedirect', 
  passport.authenticate('google', { failureRedirect: '/failure', session:false  }),
  function(req, res) {
       const token = jwt.sign({ userId: "Anas Saif", email: "anassaif@.com" }, process.env.JWT_SECRET, { expiresIn: "8h" });
        // Set the token as a cookie
        // res.cookie('jwtToken', token, { httpOnly: true });
        // Redirect back to the React application
        res.redirect(`${CLIENT_URL}/secret?token=${token}`);
  });


// dbConnect();

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);


  // console.log(socket);
  // Emit a test message to the client upon connection
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
    // io.emit('message', { temperature, humidity, pressure });
    // io.emit('message', { temperature : "Hello From..........." });

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
