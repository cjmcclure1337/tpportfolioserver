const express = require('express');
const router = express.Router();
const db = require("../models")
const userController = require("../controllers/userController");
const positionController = require("../controllers/positionController")

//POST new user by userID
router.post("/", userController.addUser)

//GET positions for all users
router.get('/', userController.getAllUsers);

//GET positions for specific user by userID
router.get('/:id', userController.getUser);

//POST new stock position
router.post("/:id/", (req, res) => {
  switch(req.body.type.toLowerCase()) {
    
    case "stock":
      positionController.addStock(req, res);
      break;
    
    case "currency":
      positionController.addCurrency(req, res);
      break;
    case "cd":
      break;
    case "mutualfund":
      break;
    default:
      console.log("Invalid type");
      break;
  }
})
  

module.exports = router;
