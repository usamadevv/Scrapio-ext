const express = require("express");
const cors = require("cors");
const dotenv=require('dotenv')



const dbConnect= require('./dbConnect');
const contactRouter = require("./routes/contact.router");
const liscRouter = require("./routes/lisc.router");

const affRouter = require("./routes/aff.router");
const orderRouter = require("./routes/order.router");
// const planetsRouter = require("./routes/planets/planets.router");
dbConnect();
const app = express();
dotenv.config();
console.log(cors());
app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(contactRouter);
app.use(liscRouter);
app.use(affRouter);


app.use(orderRouter);


module.exports = app