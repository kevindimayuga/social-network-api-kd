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
    }
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
    }
    async createUser(req, res) {
        
    }
}