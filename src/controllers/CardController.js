const CardModel = require("../models/CardModel")


//-----------------------------Create Card------------------------//

const createCard = async function (req, res) {
    try {
        let card = req.body
        let { cardType, customerName, status, vision, customerID } = card
        let findCardInDb = await CardModel.find()
        let lengthOfCard = findCardInDb.length
        //console.log(findCardInDb .length) 
        let CardData = { cardNumber: lengthOfCard + 1, cardType, customerName, status, vision, customerID }
        const cardDetails = await CardModel.create(CardData)
        return res.status(201).send({ status: true, message: "card created", data: cardDetails })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}


//--------------------------Get All Cards----------------------------------//
const getAllCards = async function (req, res) {
    try {
        let getDetails = await CardModel.find()
        return res.status(200).send({ status: true, message: "All Card Details", data: getDetails })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

}


module.exports.createCard = createCard
module.exports.getAllCards = getAllCards
















