const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse application/x-www-form-urlencoded

app.post('/', (req, res) => {
  // Extract temperature and humidity data from the request body
  const { temperature, humidity } = req.body;

  // Handle the received data (e.g., save to database, perform calculations, etc.)
  console.log('Received temperature:', temperature);
  console.log('Received humidity:', humidity);

  // Send a response back to the ESP8266
  res.status(200).send('Data received successfully');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
