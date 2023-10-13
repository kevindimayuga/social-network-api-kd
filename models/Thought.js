// This will import the Schema constructor, the model function
// and the Types object from Mongoose.
const { Schema, model, Types } = require('mongoose');

// This will import the moment.js package
const dateFormat = require('moment');

// This will create the Thought schema
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
        // This will use the reactionSchema to validate data for a reply
        reactions: [reactionSchema],
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

// This will create a reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Please provide a reaction!',
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: 'Please provide a username!',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // This will format the date using moment.js
            get: (timestamp) => dateFormat(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            getters: true,
        }, 
    }
);

// This will create a virtual called reactionCount that
// retrieves the length of the thought's reactions array field on query
// It will get the total number of reactions a thought has
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// This creates a variable called Thought that will use the thoughtSchema to create the Thought model
const Thought = model('Thought', thoughtSchema);

// This will export the Thought model to be used in other parts of the application
module.exports = Thought;