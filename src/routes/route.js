const express = require('express');
const router = express.Router();

const CustomerController=require("../controllers/Customercontroller")
const CardController=require("../controllers/Cardcontroller")

//-----------------------Middleware--------------------//
const validator = require('../Middleware/validation.js');


//---------------------Customer API---------------------//
router.post('/createCustomer',validator.checkCustomer ,CustomerController.createCustomer)
router.get('/getCustomer',CustomerController.getCustomerDetail)
router.delete('/Customer/:CustomerId',CustomerController.Deletecustomer)

//----------------------Card Api-------------------------//
router.post('/createCard',validator.checkCard,CardController.createCard)
router.get('/getcard',CardController.getAllCards)

module.exports = router;

