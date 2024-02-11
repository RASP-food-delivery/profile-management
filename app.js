const express = require("express")
const bodyParser= require("body-parser")
var cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const dbConnect = require("./db/dbConnect");

const menuRoutes = require("./routes/menuRoutes")
const vendorRoutes = require("./routes/vendorRoutes")
const adminRoutes = require("./routes/adminRoutes")

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

app.use("/api/menu",menuRoutes)
app.use("/api/profile", vendorRoutes)
app.use("/api/admin", adminRoutes)

module.exports = app