// This is to import the connection to the database
const connection = require('../config/connection');
// This is to import the User and Thought models
const { User, Thought } = require('../models');
// This is to import the data that will be used to seed the database
const { users, thoughts, reactions } = require('./data');

connection.on('error', (err) => err);