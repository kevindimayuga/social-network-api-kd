const { User, Thought } = require('../models');

module.exports = {
    // This will GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        // If there is an error, this will send the 500 error message
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will GET a single thought by its '_id'
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
            // If no thought is found, this will send the 404 error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // This will send the thought data
            res.json(thought);
        }
        // If there is an error, this will send the 500 error message
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will POST a new thought

    // This will PUT to update a thought by its '_id'

    // This will DELETE a thought by its '_id'

    // This will create (POST) a reaction stored in a single thought's 'reactions' array field

    // This will DELETE a reaction by the reaction's '_id' value
    
};