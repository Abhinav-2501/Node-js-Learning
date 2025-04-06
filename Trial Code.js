//Initial Chunk of Code 

// server.listen(3000, () =>{
//     console.log("server sucessfully run");
// })

//get all product
server.get('/api/products',async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message : error.message})
    }
});


//find by Id API 
server.get('/api/product/:id',async(req,res)=>{  //this API will have api/product as it is for singular 
    try{
        const{id} = req.params;
        const product = await Product.findById(id);   // ({ id });  ❌ WRONG: you passed an object, not just the id
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message : error.message})
    }
});

//find by name API 
server.get('/api/products/:name',async(req,res)=>{
    const{name} = req.params;
    try{
        const product = await Product.find({name});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message : error.message})
    }
});

//to post 
server.post('/api/products',async (req,res)=> {  // async humesha funtion se pehle hota hai aur es case me callback funtion ye hai 
    try{
       const product = await Product.create(req.body);
       res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
    // console.log(req.body);
    // res.send(req.body);
});

//Update 
server.put('/api/product/:id',async(req,res)=>{
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
})

//delete 
server.delete('/api/product/:id', async(req,res)=>{
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
});

