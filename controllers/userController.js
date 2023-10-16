// This will import the ObjectId method from Mongoose
// We'll use this to target a specific user by their '_id'
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // This will GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // This will GET a single user by their '_id' and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // This will POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // This will update (PUT) a user by their '_id'
    async updateUser(req, res) {
        // This will find a user by their '_id' and update their data
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            )
            // If no user is found, this will send the 404 error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // Otherwise, this will send the updated user data
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // This will DELETE a user by their '_id'

    // This will add a friend for a user by their '_id'

    // This will remove a friend from a user by their '_id'
    
}