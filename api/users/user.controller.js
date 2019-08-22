const UserManager = require ('./user.manager');
const User = UserManager.UserManager

const UserController = {
    GetAllUsers : function(req,res) {
        User.FindAll().then(data => {
            res.status(200).json({data: data})
        }).catch(err => {
            res.status(500).json({ERR: {description:'Internal Server Err'}})
        })
    },
    GetUserById : function(req,res) {
        User.FindOne(Number(req.params.userid)).then(data => {
            res.status(200).json({data: data})
        }).catch(err => {
            res.status(500).json({ERR: {description:'Internal Server Err'}})
        })
    },
    UpdateUser: function(req, res) {
        console.log(req.body);
        User.Update(req.body).then(data => {
            res.status(200).json({data: data})
        }).catch(err => {
            res.status(500).json({ERR: {description:'Internal Server Err'}})
        })
    }
};

exports.UserController = UserController;