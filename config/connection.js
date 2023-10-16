// Imports mognoose and the 'connect' and 'connection' objects from mongoose
const { connect, connection } = require('mongoose');

// This is the connection string that mongoose will use to connect to the database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

// This will connect to the database using the connection string above
connect(connectionString);

module.exports = connection;