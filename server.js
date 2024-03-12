const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse application/x-www-form-urlencoded
app.use(express.json());

app.get('/gett', (req, res) => {
  // Extract temperature and humidity data from the request body
  // const { temperature } = req.body;

  // Handle the received data (e.g., save to database, perform calculations, etc.)
  console.log('Server Called....:');
 

  // Send a response back to the ESP8266
  res.status(200).send('Server Called successfully');
});

app.post('/saveData', (req, res) => {
  // Extract temperature and humidity data from the request body
  const { temperature } = req.body;

  // Handle the received data (e.g., save to database, perform calculations, etc.)
  console.log('Received Save DATA:', temperature);
 

  // Send a response back to the ESP8266
  res.status(200).send('Data received successfully');
});

app.post('/', (req, res) => {
  // Extract temperature and humidity data from the request body
  const { temperature } = req.body;

  // Handle the received data (e.g., save to database, perform calculations, etc.)
  console.log('Received temperature:', temperature);
 

  // Send a response back to the ESP8266
  res.status(200).send('Temp received successfully');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
