const express = require('express');
const bodyParser = require('body-parser');
const { saveSensorReading } = require('./controllers/sensorController'); // Import the controller function
const dbConnect = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Server called successfully');
  res.status(200).send('Server called successfully');
});

// Use the controller function to handle POST requests for sensor readings
app.post('/', saveSensorReading);


dbConnect();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
