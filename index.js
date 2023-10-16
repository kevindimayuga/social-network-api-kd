// Import express, connection to db, and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set up port and initialize express app
const PORT = process.env.PORT || 3001;
const app = express();

// Set up middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use routes
app.use(routes);

// Start server after db connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});