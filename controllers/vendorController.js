const Vendor = require("../db/models/vendorModel")
const jwt = require("jsonwebtoken");

module.exports.updateImage = async (req, res) =>{
    filter = {_id: req.params.resId}
    update = {img: req.body.image}
    const updatedItem = await Vendor.findOneAndUpdate(filter,
        update);
    if(updatedItem){
        res.status(201).send(
            {message: "Image edited."}
        )
    }
    else  {
        res.status(401).send({ message: "Unauthorized" });
    }
}