// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load comments from the file
function loadComments() {
    var comments = fs.readFileSync('comments.json', 'utf8');
    return JSON.parse(comments);
}

// Save comments to the file
function saveComments(comments) {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Get list of comments
app.get('/comments', function(req, res) {
    res.json(loadComments());
});

// Add new comment
app.post('/comments', function(req, res) {
    var comments = loadComments();
    var newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);
    saveComments(comments);
    res.json(newComment);
});

// Start the server
app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});