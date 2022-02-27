const mongoose = require('mongoose')
const validator = require("email-validator");
const CustomerModel = require("../models/CustomerModel")
const CardModel = require("../models/CardModel")




const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false 
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
};


const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0;
};

//validation for Mobile Number
const isValidMobileNum = function (value) {
    if (!(/^[6-9]\d{9}$/.test(value))) {
        return false
    }
    return true
}

//validation for Email
const isValidSyntaxOfEmail = function (value) {
    if (!(validator.validate(value))) {
        return false
    }
    return true
}


const checkCustomer = async (req, res, next) => {
    try {
        let customer = req.body
        let { firstname, lastname, mobileNumber, DOB, emailID, address,status } = customer
        if (!isValidRequestBody(customer)) {
            return res.status(400).send({ status: false, message: "Please provide data" });
        }
        if (!isValid(firstname)) {
            return res.status(400).send({ status: false, message: "Please provide firstname" });
        }
        if (!isValid(lastname)) {
            return res.status(400).send({ status: false, message: "Please provide lastname" });
        }
        if (!isValid(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Please provide mobileNumber" });
        }
        if (!isValidMobileNum(mobileNumber)) {
            return res.status(400).send({ status: false, message: 'Please provide a valid phone number' })
        }
        const isphoneNumberAlreadyUsed = await CustomerModel.findOne({ mobileNumber }); 

        if (isphoneNumberAlreadyUsed) {
            res.status(400).send({ status: false, message: `${mobileNumber} is already registered`, });
            return;
        }
        if (!isValid(DOB)) {
            return res.status(400).send({ status: false, message: "Please provide DOB" });
        }
        if (!isValid(emailID)) {
            return res.status(400).send({ status: false, message: "Please provide emailID" });
        }
        if (!isValidSyntaxOfEmail(emailID)) {
            return res.status(404).send({ status: false, message: "Please provide a valid Email Id" });
        }
        const isEmailAlreadyUsed = await CustomerModel.findOne({ emailID }); 
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${emailID} is already registered` })
        }
        if (!isValid(address)) {
            return res.status(400).send({ status: false, message: "Please provide address" });
        }
        
        if (!isValid(status)) {
            return res.status(400).send({ status: false, message: "Please provide status" });
        }
        next();
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}




const checkCard = async (req, res, next) => {
    try {
        let card=req.body
        let {cardType,customerName,vision,customerID}= card
        if (!isValidRequestBody(card)) {
            return res.status(400).send({ status: false, message: "Please provide data" });
        }
        if (!isValid(cardType)) {
            return res.status(400).send({ status: false, message: "Please provide cardType" });
        }
        if (!isValid(customerName)) {
            return res.status(400).send({ status: false, message: "Please provide customerName" });
        }
        
        if (!isValid(vision)) {
            return res.status(400).send({ status: false, message: "Please provide vision" });
        }
        if (!isValid(customerID)) {
            return res.status(400).send({ status: false, message: "Please provide customerID" });
        }
        const isCardAlreadyGenrate = await CardModel.findOne({customerID }); 
        if (isCardAlreadyGenrate) {
            return res.status(400).send({ status: false, message: `${customerID} is already registered` })
        }
        next();
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.checkCustomer =checkCustomer 
module.exports.checkCard =checkCard
