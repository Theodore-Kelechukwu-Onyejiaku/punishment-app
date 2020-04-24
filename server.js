const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//configuring dotenv 
require("dotenv").config();


const app = express();

app.use(cors());
//This will allow our APP to serve JSON 
app.use(express.json());

const uri = process.env.DATABASE_LOCAL;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB database connection successful")
})

//Importing our routes
const punishmentRouter = require("./routes/punishments");
const punisheeRouter = require("./routes/punishee");

app.use("/punishments", punishmentRouter);
app.use("/punishees", punisheeRouter);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("server running successfully on port: "+port);
})