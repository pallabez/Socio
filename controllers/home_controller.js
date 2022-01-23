const { find } = require('../models/post');
const Post = require('../models/post');

module.exports.home = function(req, res) {
    Post.find({}).populate('user').exec((err, posts) => {
        return res.render('home', {
            title: "Home",
            posts: posts,
        });
    });
}