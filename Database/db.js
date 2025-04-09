const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@backenddb.tys8rpb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`)
    .then(()=>{console.log("connected to Database");
    })
    .catch(()=>{
        console.log("Not connected to Database");
    })
}

module.exports = dbConnection;