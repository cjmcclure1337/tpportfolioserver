const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const positionController = require("../controllers/positionController");

//POST new user by userID
router.post("/", userController.addUser)

//GET positions for all users
router.get('/', userController.getAllUsers);

//GET positions for specific user by userID
router.get('/:id', userController.getUser);

//POST new investment position
router.post("/:id/", (req, res, next) => {
  switch(req.body.type.toLowerCase()) {
    
    case "stock":
      positionController.addStock(req, res, next);
      break;
    
    case "currency":
      positionController.addCurrency(req, res, next);
      break;

    case "cd":
      positionController.addCD(req, res, next);
      break;

    case "mutualfund":
      //TBD
      console.log("Invalid type");
      break;

    default:
      console.log("Invalid type");
      res.send("Invalid Type")
      break;
  }
})

//DELETE specific investment position
router.delete("/:id", (req, res, next) => {
  console.log("Delete Body: ", req.query)
  switch(req.query.type.toLowerCase()) {
    
    case "stock":
      positionController.removeStock(req, res, next);
      break;
    
    case "currency":
      positionController.removeCurrency(req, res, next);
      break;

    case "cd":
      //TBD
      console.log("Invalid type CD");
      res.send("Invalid Type")
      break;

    case "mutualfund":
      //TBD
      console.log("Invalid type Mutual Fund");
      res.send("Invalid Type")
      break;

    default:
      console.log("Invalid type");
      res.send("Invalid Type")
      break;
  }
})


module.exports = router;
