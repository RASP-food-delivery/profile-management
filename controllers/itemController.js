const Menu = require("../db/models/itemModel")
const jwt = require("jsonwebtoken");

module.exports.getItems = async (req, res) => {
    Menu.find({}).then( (docs) => {
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

module.exports.addItem =  async (req, res) => {
    try{
        const token = req.body.token

        const decodedToken = jwt.decode(token, "RANDOM-TOKEN");
        const resId = decodedToken.id
        const userRole = decodedToken.userRole
        const product = req.body.product
        const stock = product.stock==="Available"? 1:0;
        const addItem = typeof product.img !== 'undefined'? 
        {
            resId: resId,
            name: product.name,
            price: product.price,
            description: product.description,
            availability: stock,
            category: product.category,
            img: product.img
        } : 
        {
            resId: resId,
            name: product.name,
            price: product.price,
            description: product.description,
            availability: stock,
            category: product.category,
        };

        
        if (userRole==='vendor'){
            const item = await new Menu(addItem)
            await item.save()
            .then((result) => {
                res.status(201).send({
                    message: "Item added successfully"
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Error adding item",
                    error
                })
            })
        } else {
            return res.status(400).send({
                message: "Only vendors can add items!"
            })
        }
    } catch{
        res.status(401).json({
            error: new Error("Invalid request!"),
          });
    }
}

module.exports.deleteAll = async (req, res) => {
    Menu.deleteMany({}).then(
        function(){
            console.log("Data deleted successfully.")
        }
    ).catch(
        function(){
            console.log("Could not delete data.")
        }
    )
}

module.exports.showRestaurant = async (req,res) => {
    const vendorId = req.params.resId
    Menu.find({resId: vendorId}).then((docs) => {
        res.status(200).send(docs)
    }).catch((error)=>{
        res.status(400).send(
            
            {
                message: "Could not find items.",
                error: error
            }
        )
        }
        
    )
}

module.exports.deleteRestaurantItems = async (req, res) => {
    Menu.deleteMany({resId: req.params.resId}).then(
        function(){
            console.log("All items of restaurant deleted successfully.")
        }
    ).catch(
        function(){
            console.log("Could not delete items.")
        }
    )
}

module.exports.deleteSingle = async (req, res) => {
        Menu.deleteOne({resId: req.params.resId, name: req.params.name}).then(
            res.status(201).send(
                {message: "Item deleted."}
            )
        ).catch((error) => {
            res.status(400).send({
                message: "Could not delete item.",
                error: error 
            })
        }
        )
    }

module.exports.updateItem = async (req,res) => {
        const token = req.body.token
        const decodedToken = jwt.decode(token, "RANDOM-TOKEN");
        const resId = req.params.resId
        const userRole = decodedToken.userRole
        const product = req.body.product
        const stock = product.stock==="Available"? 1:0;
        const name = req.params.name
        if (userRole==='vendor'){
            const item = {
                resId: resId,
                name: product.name,
                price: product.price,
                description: product.description,
                availability: stock,
                category: product.category,
                img: product.img
            }
            const updatedItem = await Menu.findOneAndUpdate(
                { resId: resId, name: name },
                item,
                { new: true } 
            );
            if(updatedItem){
                res.status(201).send(
                    {message: "Item edited."}
                )
            }
            else  {
                res.status(401).send({ message: "Unauthorized" });
            }
            
        } else{
            console.log("unauthorized")
        }
}
