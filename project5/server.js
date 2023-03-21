const express = require('express'); // Load express library for Node
const app = express();  // Create instance of express
const port = 3000;  // Set port number

app.use(express.static('public'));  // Configure express app to serve static files

app.get('/', (req, res) => {  // Setting up root path of server
  res.sendFile(__dirname + '/public/index.html'); // Using sendFile method to send html file to client
});

app.listen(port, () => {  // Start server and listen at the port
  console.log(`Server at http://localhost:${port}`);
});
