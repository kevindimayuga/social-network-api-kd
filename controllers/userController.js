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
            // This will send the updated user data
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will DELETE a user by their '_id'
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            // If no user is found, this will send the 404 error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // This will delete all thoughts associated with the deleted user
            const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json('User and their thoughts have been deleted');
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will add a friend for a user by their '_id'
    async addFriend(req, res) {
        try {
            console.log('You are adding a friend');
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            // If no user is found, this will send the 404 error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // This will send the updated user data
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will remove a friend from a user by their '_id'
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            // If no user is found, this will send the 404 error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            // This will send the updated user data
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
