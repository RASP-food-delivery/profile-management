const express = require("express")
const bodyParser= require("body-parser")
var cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const dbConnect = require("./db/dbConnect");

const userRoutes = require("./routes/vendorRoutes")

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

dbConnect()

app.use("/api/menu",userRoutes)

module.exports = app