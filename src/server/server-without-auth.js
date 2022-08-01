const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');
const mongoose = require('mongoose');
const url = require('url');

const app = express();
app.use(bodyParser.json());
app.use(cors());



mongoose.connect("mongodb://localhost/react-blogs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Post = mongoose.model(
    "posts",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        author: String,
        date: String,
        title: String,
        text: [{}],
        image: String,
        comments: [{}],
        rating: Number,
        likes: [String],
        category: String,
        tags: [String]
    })
);


//all posts page
app.get("/api/posts", async (req, res) => {
    const queryParams = url.parse(req.url,true).query;
    let foundPosts;
    const totalCount = await Post.count();
    const remainder = totalCount - queryParams.skip;
    if ( remainder > queryParams.limit) {
        foundPosts = await Post.find({}).skip (queryParams.skip).limit(queryParams.limit);
    } else {
        foundPosts = await Post.find({}).skip (queryParams.skip).limit(remainder);
    }
    res.send({posts: foundPosts, totalCount: totalCount});
})

app.post("/api/posts", async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.send(savedPost);
})
app.patch("/api/posts", async (req, res) => {
    const savedPost = await Post.updateOne(
        { _id: req.body._id } ,
        { $inc: { rating: 1 } }
        )
    res.send(savedPost);
})


//single post page

app.get("/api/post*", async (req, res) => {
    const reqId = req.params[0].slice(1);
    const foundPost = await Post.find({_id: reqId});
    res.send(foundPost[0]);
})


//server settings
const port = process.env.PORT || 3010;


//run server
app.listen(port, () => {
    console.log('App is working at http://', port);
})