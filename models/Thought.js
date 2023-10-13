// This will import the Schema constructor, the model function
// and the Types object from Mongoose.
const { Schema, model, Types } = require('mongoose');

// This will import the moment.js package
const dateFormat = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please provide a thought!',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // This will format the date using moment.js
            get: (timestamp) => dateFormat(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: 'Please provide a username!',
        },
        // This will use the replySchema to validate data for a reply
        replies: [replySchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // This will prevent virtuals from creating duplicate of _id as `id`
        id: false,
    },
);