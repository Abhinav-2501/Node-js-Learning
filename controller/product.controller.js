const Product = require('../models/product.model.js');

const getProducts = async(req,res)=>{
    try{
            const product = await Product.find({});
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message : error.message})
        }
    }

const getById = async(req,res)=>{
    try{
        const{id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

const getByName = async(req,res)=>{
    const{name} = req.params;
    try{
        const product = await Product.find({name});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const createProduct = async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
     }catch(error){
         res.status(500).json({message: error.message});
     }
}

const deleteProduct = async(req,res)=>{
    try{
        const{id} = req.params
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message : "Product not found"});
        }
        const delproduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: `Product '${product.name}' is deleted successfully.`,
            deletedProduct: product // optional: include full product info
        });
        // const Product = await Product.findById(id);
    }catch(error){
        res.status(500).json({message : error.message});
    }
}
 const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message : "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);  //If you dont write this line it will be updated but API will keeploading in case of success
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

const authorName = (req, res) => {
    res.send("Hello this is my Abhinav");
};
    module.exports = {
        getProducts , getById , getByName , createProduct , deleteProduct ,updateProduct ,authorName
    }