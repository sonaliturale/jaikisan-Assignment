const CustomerModel = require("../models/CustomerModel")
const { v4: uuidv4 } = require('uuid');

//-----------------------------CreateCustomer---------------------------//
const createCustomer = async function (req, res) {
    try {
        let customer = req.body
        let { firstname, lastname, mobileNumber, DOB, emailID, address,status } = customer
        let customerID = uuidv4()
        let customerdata = { firstname, lastname, mobileNumber, DOB, emailID, address,customerID:customerID, status }
        const createddata = await CustomerModel.create(customerdata)
        return res.status(201).send({ status: true, message: 'success', data: createddata })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}


//--------------------------GetCustomer--------------------------//
const getCustomerDetail = async function(req,res) {
    try{
        let status="ACTIVE"
        let getCustomer= await CustomerModel.find({status:status})
        return res.status(200).send({status:true, message:"All ACTIVE Customers", data:getCustomer})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}



//------------------------DeleteCustomer---------------------//
const Deletecustomer = async function (req, res) {
    try {
        let CustomerId = req.params.CustomerId
        let deletedCustomer = await CustomerModel.findOneAndUpdate({ _id: CustomerId},{ isDeleted: true }, { new: true });
        return res.status(200).send({ status: true, message: 'data deleted successfully', data: deletedCustomer})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}


module.exports.createCustomer=createCustomer
module.exports.getCustomerDetail=getCustomerDetail
module.exports.Deletecustomer=Deletecustomer


