const db = require("../models")


const addUser = (req, res) => {
    db.User.create({
        Id: req.body.userId
      })
        .then(newUser => res.send(newUser))
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const getAllUsers = (req, res) => {
    db.User.findAll({
        include: [db.Stock, db.Currency]
    })
        .then(allUsers => res.send(allUsers))
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const getUser = (req, res, next) => {
    db.User.findOne({
        where: {Id: req.params.id},
        include: [db.Stock, db.Currency]
    })
        .then(user => res.send(user))
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}



module.exports = {
    addUser,
    getAllUsers,
    getUser
}