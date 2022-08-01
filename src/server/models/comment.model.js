const mongoose = require("mongoose");
const shortid = require("shortid");

const Comment = mongoose.model(
    "comments",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        postId: {type: String},
        author: String,
        date: String,
        text: [String],
        authorDetails: {}
    })
);

module.exports = Comment;