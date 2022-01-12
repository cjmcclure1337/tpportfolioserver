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
    db.User.findOne({
        where: {Id: req.params.id},
        include: [db.Stock, db.Currency]
    }).then(user => res.send(user))
}



module.exports = {
    addUser,
    getAllUsers,
    getUser
}