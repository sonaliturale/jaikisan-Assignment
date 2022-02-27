const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   mobileNumber: {
      type: String,
      required: true
   },
   DOB: {
      type: Date,
      required: true
   },
   emailID: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   customerID: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true, 
      uppercase:true,
      enum: ['ACTIVE','INACTIVE']
   },
   isDeleted:{
      type:Boolean,
      default:false
   }
  
 
},  { timestamps: true })

module.exports = mongoose.model('customers', customerSchema)










