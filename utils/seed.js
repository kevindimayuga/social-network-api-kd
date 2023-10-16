// This is to import the connection to the database
const connection = require('../config/connection');
// This is to import the User and Thought models
const { User, Thought } = require('../models');
// This is to import the data that will be used to seed the database
const { users, thoughts, reactions } = require('./data');

// This error handler will be invoked on failure
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to database');
    // These will delete any of the specific collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    
    let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
    if (reactionCheck.length) {
        await connection.dropCollection('reactions');
    }

    // This will insert the users into the database
    await User.collection.insertMany(users);
    // This will insert the thoughts and reactions into the database
    await Thought.collection.insertMany(thoughts);
    await Thought.collection.insertMany(reactions);

    // This will log the seed data for each collection and
    // indicate what should appear in the database
    console.table(users);
    console.table(thoughts);
    console.table(reactions);

    // This will log a message to indicate that the seeding is complete of all collections
    console.info('Seeding complete! 🌱');
    // This will exit the process which will end the connection to the database
    process.exit(0);
});