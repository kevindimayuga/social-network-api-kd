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
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        }
        // If there is an error, this will send the 500 error message
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will PUT to update a thought by its '_id'
    async updateThought(req, res) {
        // This will find a thought by its '_id' and update its data
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            // If no thought is found, this will send the 404 error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // This will send the updated thought data
            res.json(thought);
        }
        // If there is an error, this will send the 500 error message
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will DELETE a thought by its '_id'
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            // If no thought is found, this will send the 404 error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // TODO: double check if this is correct
            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thoughtId } }
            );
            // // This will send the deleted thought data
            // res.json(thought);

            // updated to send a message instead of the deleted thought data
            res.json('This thought has been deleted');
        }
        // If there is an error, this will send the 500 error message
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will create (POST) a reaction stored in a single thought's 'reactions' array field
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            // If no thought is found, this will send the 404 error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            // This will send the updated thought data
            res.json(thought);
        }
        // If there is an error, this will send the 500 error message
        catch (err) {
            res.status(500).json(err);
        }
    },

    // This will DELETE a reaction by the reaction's '_id' value
    async deleteReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId } } },
                    { runValidators: true, new: true }
                );
                // If no thought is found, this will send the 404 error message
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with that ID' });
                }
                // // This will send the updated thought data
                // res.json(thought);

                // updated to send a message instead of the updated reaction data
                res.json('This reaction has been deleted');
            }
            // If there is an error, this will send the 500 error message
            catch (err) {
                res.status(500).json(err);
            }
        }
};