const mongoose = require("mongoose");
const shortid = require("shortid");

const Post = mongoose.model(
    "posts",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        author: String,
        date: String,
        title: String,
        text: [String],
        image: String,
        comments: [{}],
        rating: Number,
        likes: [String],
        category: String,
        tags: [String]
    })
);

module.exports = Post;