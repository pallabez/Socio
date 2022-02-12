const db = require('../config/mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        }); 
        req.flash('success', "Post published!");
        return res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //.id means converting the object id to string
        if(post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', "Post deleted!");
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', 'Unable to delete post');
        return;
    }
}