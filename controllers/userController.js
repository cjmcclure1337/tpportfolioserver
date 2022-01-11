const db = require("../models")


const addUser = (req, res) => {
    db.User.create({
        Id: req.body.userId
      })
      .then(newUser => res.send(newUser))
}

const getAllUsers = (req, res) => {
    db.User.findAll({
        include: [db.Stock, db.Currency]
    }).then(allUsers => res.send(allUsers))
}

const getUser = (req, res) => {
    res.send("Retrieving positions for user: " + req.params.id);
}



module.exports = {
    addUser,
    getAllUsers,
    getUser
}