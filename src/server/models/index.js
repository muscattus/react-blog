const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.post = require("./post.model");
db.comment = require("./comment.model");
module.exports = db;