// This will import Schema and model from Mongoose
const { Schema, model } = require('mongoose');

// This will import the validator package
const validator = require('validator');

// This function does the validation for the email (uses a regex email pattern to validate the email)
function validateEmail(email) {
    return validator.isEmail(email);
}

// This will create the User schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please provide a username!',
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: 'Please provide an email!',
            validate: {
                // This will use the validator package to validate the email
                validator: validateEmail,
                message: 'Please provide a valid email address!',
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    // This will define how models based on this 
    // schema will retrieve data from the database
    // and serialize it so that it can be sent to the client as JSON
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // This will prevent virtuals from creating duplicate of _id as `id`
        id: false,
    }
);

// This will create a virtual called friendCount that
// retrieves the length of the user's friends array field on query
// It will get the total number of friends a user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// This creates a variable called User that will use the userSchema to create the User model
const User = model('Users', userSchema);

// This will export the User model to be used in other parts of the application
module.exports = User;