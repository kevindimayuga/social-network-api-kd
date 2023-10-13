// This will import Schema and model from Mongoose
const { Schema, model } = require('mongoose');

// This will import the validator package
const validator = require('validator');

// This function does the validation for the email
function validateEmail(email) {
    return validator.isEmail(email);
}

// This will create the User schema
const usersSchema = new Schema(
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
                ref: 'Thought',
            },
        ],
    },
);