const express = require("express");
const fs = require("fs");
const Product  = require('./models/product.model.js');
const server = express();
const productRoute = require('./routes/product.route.js')

require('dotenv').config();  //This is for .env file 


//middleware
server.use(express.json()); //this is done as we are not allowed to pass Json so we kindof use this Middleware


// Routes 
server.use('/api/products',productRoute);


// server.get('/',(req,res)=>{
//     res.send("Hello this is my learning");
// });

// server.get('/abhi',(req,res)=>{
//     res.send("Hello this is my Abhinav");
// });

const mongoose= require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@backenddb.tys8rpb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`)
.then(()=>{console.log("conected to database");
    server.listen(3000,()=>{
        console.log("server is running on port 3000")
    })
})
.catch(()=>{
    console.log("Not connceted");
})
