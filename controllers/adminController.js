const Admin = require("../db/models/adminModel")
const Vendor = require("../db/models/vendorModel")

module.exports.displayUnverified = async (req, res) => {
    Vendor.find({isVerified:0}).then( (docs) => {
        res.status(200).send(docs)
    }
    ).catch((error) => {
        res.status(400).send({
            message: "Could not get items.",
            error: error
        }
        )
    })
}

module.exports.displayVerified = async (req, res) => {
    Vendor.find({isVerified:1}).then( (docs) => {
        res.status(200).send(docs)
    }
    ).catch((error) => {
        res.status(400).send({
            message: "Could not get items.",
            error: error
        }
        )
    })
}

module.exports.verifyVendor = async (req, res) => {
    filter = {_id: req.params.resId}
    update = {isVerified:1}
    const updatedItem = await Vendor.findOneAndUpdate(filter,
        update);
    if(updatedItem){
        res.status(201).send(
            {message: "Restaurant edited."}
        )
    }
    else  {
        res.status(401).send({ message: "Could not edit." });
    }
}

module.exports.deleteVendor = async (req, res) => {
    Vendor.deleteOne({resId: req.params.resId}).then(
        res.status(201).send(
            {message: "Restaurant deleted."}
        )
    ).catch((error) => {
        res.status(400).send({
            message: "Could not delete restaurant.",
            error: error 
        })
    }
    )
}