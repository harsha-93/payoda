var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/master";
const UserManager = {

    FindAll: function(id) {
        return new Promise ((resolve, reject) => {
            try {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("master");
                    dbo.collection('users').aggregate([
                        { $lookup:
                           {
                             from: 'posts',
                             localField: 'id',
                             foreignField: 'userId',
                             as: 'posts'
                           }
                         }
                        ]).toArray(function(err, result) {
                    if (err) throw err;
                    resolve(result);
                    db.close();
                    });
                });
            } catch (err) {
                reject(err);
            }
        })        
    },
    FindOne: function(id) {
        return new Promise ((resolve, reject) => {
            try {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("master");
                    dbo.collection('users').aggregate([
                        {
                          $match:{id: id}  
                        },
                        { $lookup:
                           {
                             from: 'posts',
                             localField: 'id',
                             foreignField: 'userId',
                             as: 'posts'
                           }
                         }
                        ]).toArray(function(err, result) {
                        if (err) throw err;
                        resolve(result)
                        db.close();
                    });
                });
            } catch (err) {
                reject(err);
            }
        })
    },
    Update: function(user) {
        return new Promise ((resolve, reject) => {
            try {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("master");
                    query = {id: user.id};
                    values = { $set: user };
                    dbo.collection('users').update(query, values, function(err, result) {
                        if (err) throw err;
                        resolve(`user ${user.name} with id ${user.id} has been updated successfully`);
                        db.close();
                    });
                });
            } catch (err) {
                reject(err);
            }
        })        
    }

    

}

exports.UserManager = UserManager;