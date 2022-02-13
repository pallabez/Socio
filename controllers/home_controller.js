const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    try {
        const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        })
    
        const users = await User.find({});
    
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users,
        });
    } catch(err) {
        console.log('Error in loading home page', err);
        return;
    }
}