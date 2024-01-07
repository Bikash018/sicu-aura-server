const express = require("express")
const collection = require("./mongo")
const path  = require('path')
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
dotenv.config()
// console.log(process.env.MONGO_DB)
const userModel = require("./mongo");
mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


// app.get("/",cors(),(req,res)=>{

// })
app.get("/data",cors(), (req,res)=>{

    userModel.find()
    .then(users => res.status(202).json(users))
    .catch(err => res.status(403).json(err))
})


app.post("/",async(req,res)=>{
    const{Email,Password}=req.body
    

    try{
        const check=await collection.findOne({Email:Email , Password: Password })
      

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const {  Hospital,Address,City,State,Pincode,Registration,Ambulance,Email,Phone,Emergency,Password } = req.body;

    const data={
        Hospital: Hospital,
        Address: Address,
        City: City,
        State: State,
        Pincode: Pincode,
        Registration: Registration,
        Ambulance: Ambulance,
        Email: Email,
        Phone: Phone,
        Emergency: Emergency,
        Password: Password
    }

    try{
        const check=await collection.findOne({Email:Email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.use(express.static(path.join(__dirname, '/client/build')));
app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"), (err) =>{
        res.status(500).send(err)
    })
})

app.listen(8000,()=>{
    console.log("port connected");
})
