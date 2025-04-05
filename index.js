// get --> read 
// post -->  create 
// put --> update
// delete --> remove
// patch --> update
// express --> server 

const express = require("express");
const fs = require("fs");

const server = express();
server.use(express.json());

const user = JSON.parse(fs.readFileSync("db.txt", 'utf-8'));
// get api
//http://localhost:3000/

/*
res.send  -> txt, html, json, object etc
res.json  -> json object.
res.status(200).json(json)
*/

/*
route parameter 
api/v1/:id
api/v1/:id?  -> id optional
req.param
*/
/*
obj1 = {name: "a", id:1, branch:"b.tech"}
const {name, id, branch} = obj1
*/
server.get("/api/v1/:id",(req, res) =>{
    // res.send("<h1>hello my boy</h1>");
    const {id} = req.params
    // console.log(id, req.params);
    const current_user = user.find((value) => value.rollNo === parseInt(id));
    // console.log(current_user);
    if(current_user){
        res.status(200).json({
            status: "successfull",
            data: current_user});
    }
    else{
        res.status(404).json({
            status:"failed",
            data : null
        })
    }
})

// create new user into database
server.post("/api/v1/", (req, res) =>{
    const newUser = req.body;
    console.log(newUser);
    if(!newUser)
        res.status(400).json({
            status:"failed",
            msg:"somthing is wrong!"
    })

    user.push(newUser);
    fs.writeFileSync("db.txt", JSON.stringify(user, null, 2));
    console.log(user);
    res.status(201).json({
        status:"successfully",
        msg: "new user successfully created!"
    })
})


// delete user 

server.delete("/api/v1/:id", (req,res)=>{
    const {id} = req.params;
    const index = user.findIndex((item) => item.rollNo === parseInt(id));
    if(index != -1){
        user.splice(index, 1);
        fs.writeFileSync("db.txt", JSON.stringify(user, null, 2));
        res.status(200).json({
            status:"successfull",
            msg: "user successfully deleted!"
        })
    }
    else{
        res.status(400).json({
            status:"failed",
            msg:"user not found!"
        })
    }
})


// update user details
server.put("/api/v1/:id", (req, res)=>{
    
})


server.listen(3000, () =>{
    console.log("server sucessfully run");
})

