const mongoose = require ('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber: {
       type: String,
       required: true
    },
    cardType: {
        type: String,
        required: true,
        uppercase:true,
        enum: ['REGULAR','SPECIAL']
     },
     customerName: {
        type: String,
        required: true
     },
     status: {
        type: String,
        required: true,
        uppercase:true,
        enum: ['ACTIVE','INACTIVE'],
        default:'ACTIVE'
      },
     vision: {
        type: String,
        required: true
     },
     customerID: {
        type: String,   
        ref: 'customers',
        required: true
     }

    },  { timestamps: true })

    module.exports = mongoose.model('cards', cardSchema)

    

    









    //