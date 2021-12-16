module.exports.profile = function(req, res) {
    return res.end("<h1>User profile</h1>")
}

module.exports.post = function(req, res) {
    return res.end("<h1>User Posts</h1>")
}