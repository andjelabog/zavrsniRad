const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;