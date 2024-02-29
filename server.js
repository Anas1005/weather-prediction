const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Route handler for the POST request from the ESP8266
app.post('/', (req, res) => {
  // Extract temperature and humidity data from the request body
  const { temperature, humidity } = req.body;

  // Handle the received data (e.g., save to database, perform calculations, etc.)
  console.log('Received temperature:', temperature);
  console.log('Received humidity:', humidity);

  // Send a response back to the ESP8266
  res.status(200).send('Data received successfully');
});

// Route handler for the GET request
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the server');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
