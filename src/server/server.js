const express = require('express');
const cors = require('cors');
const url = require('url');
const db = require("./models");
const { verifySignUp } = require("./middlewares");
const controller = require("./controllers/auth.controller");

const Post = db.post;
const User = db.user;
const Comment = db.comment;
const corsOptions = {
    origin: "http://localhost:3000"
  };

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));


db.mongoose.connect("mongodb://localhost/react-blogs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



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
    const foundPost = await Post.findById(reqId);
    res.send(foundPost);
})
app.get("/api/comments*", async (req, res) => {
    const reqId = req.params[0].slice(1);
    const foundComments = await Comment.find({'postId': reqId});
    for (let comment of foundComments) {
        const authorInfo = await User.findById(comment.author, {fullname: 1, username: 1, userpic: 1});
        comment.authorDetails = authorInfo;
    }
    res.send(foundComments);
})

app.post("/api/comment", async (req, res) => {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    const authorInfo = await User.findById(savedComment.author, {fullname: 1, username: 1, userpic: 1});
    savedComment.authorDetails = authorInfo;
    res.send(savedComment);
})

app.post('/api/like', async (req, res) => {
    const target = req.body._id;
    const user = req.body.user;
    const savedPost = await Post.updateOne(
        { _id: target } ,
        { $push: { likes: user } }
    );
    res.send(savedPost);
})
app.post('/api/unlike', async (req, res) => {
    const target = req.body._id;
    const user = req.body.user;
    const savedPost = await Post.updateOne(
        { _id: target } ,
        { $pull: { likes: user } }
    );
    res.send(savedPost);
})


// authentication

app.post(
    "/api/auth/signup", 
        [verifySignUp.checkDuplicateUsername],
        controller.signup
);
app.post(
    "/api/auth/signin", async (req, res) => {
        return controller.signin(req, res);
    }
);

app.get(
    "/api/auth/user", async (req, res) => {
        return controller.getuser(req, res);
    }
)


//server settings
const port = process.env.PORT || 3010;


//run server
app.listen(port, () => {
    console.log('App is working at http://', port);
})