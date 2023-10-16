// This is the data that will be used to seed the database (example data)
const users = [
    {
        username: "lernantino",
        email: "lernantino@gmail.com",
        thoughts: [],
        friends: []
    },
];

const thoughts = [
    {
        thoughtText: "Here's a cool thought...",
        username: "lernantino",
        reactions: []
    },
];

const reactions = [
    {
        reactionBody: "Here's a cool reaction...",
        username: "lernantino",
    },
];

module.exports = { users, thoughts, reactions };