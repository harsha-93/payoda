var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/master";
var http = require('http');
var _ = require('lodash');
const userCollection = 'users';
const postCollection = 'posts';
var postsData = '';
var commentsData = '';
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database Conncected");
    var dbo = db.db("master");
    // save user details
    dbo.dropCollection(userCollection, (err, res) => {});
    dbo.dropCollection(userCollection, (err, res) => {});

    dbo.createCollection(userCollection, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        http.get('http://jsonplaceholder.typicode.com/users', (resp) => {
            resp.setEncoding('utf8');
            var userdata = '';
            resp.on('data', (data) => {
                userdata = userdata + data;
            });
            resp.on('end', () => {
                let data = JSON.parse(userdata);
                dbo.collection(userCollection).insertMany(data, function(err, res) {
                    if (err) throw err;
                    console.log("Users inserted");
                });
            })
        })
    });

    // save post details along with comments
    dbo.createCollection(postCollection, function(err, res) {
        if (err) throw err;
        
        GetPostDetails().then(posts => {
            GetCommentDetails().then(commentsList => {
                posts.forEach(element => {
                    let postComments = _.filter(commentsList, {postId: element.id});
                    element.comments = postComments;
                });
                dbo.collection(postCollection).insertMany(posts, function(err, res) {
                    if (err) throw err;
                    console.log("posts inserted");
                    db.close();
                });
            }).catch(err => {
                throw err;
            });
        }).catch(err => {
            throw err;
        })   
    })
})

// function to get post details
function GetPostDetails () {
    return new Promise((resolve, reject) => {
        try {
            http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
                resp.setEncoding('utf8');
            
                resp.on('data', (data) => {
                    postsData = postsData + data;
                });

                resp.on('end', () => {
                    let data = JSON.parse(postsData);
                    resolve(data);
                });
            });
        } catch (error) {
            reject (error);
        }
    });
}

// function to get comments details
function GetCommentDetails () {
    return new Promise((resolve, reject) => {
        try {
            http.get('http://jsonplaceholder.typicode.com/comments', (resp) => {
                resp.setEncoding('utf8');
            
                resp.on('data', (data) => {
                    commentsData = commentsData + data;
                });

                resp.on('end', () => {
                    let data = JSON.parse(commentsData);
                    resolve(data);
                });
            })
        } catch (error) {
            throw error;
        }
    });
}
