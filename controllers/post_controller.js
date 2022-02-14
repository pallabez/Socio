const db = require('../config/mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { localsName } = require('ejs');

module.exports.create = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        }); 
        console.log(req.user)
        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                    username: req.user.username
                }, 
                message: "Post Created"
            })
        }

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

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: "Post deleted!",
                })
            }

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