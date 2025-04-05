const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true , "Please enter product name"]
        },
        quantity: {
            type : Number ,
            required : true,
            default : 0
        },
        price : {
            type : Number,
            Required : [true],
            default : 0
        },
        image : {
            type : String,
            Required : [false],
        },
    },
    {
        Timestamp : true // this allow us to have 2 more fields that is created at and updated at
    }
);

// Allowing MongoDB to use it 

const Product = mongoose.model("Product" , productSchema)  
//here it will in capital but in database it will be in lower case & Here it will be Singular but it will come as Products

module.exports = Product;