const mongoose=require("mongoose")
// mongoose.connect("mongodb://0.0.0.0:27017/react-login-tut")
// console.log(process.env.MONGO_DB)


const newSchema = new mongoose.Schema({
    Hospital: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Pincode: {
        type: String,
        required: true
    },
    Registration: {
        type: String,
        required: true
    },
    Ambulance: {
        type: String
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Emergency: {
        type: String
    },
    Password: {
        type: String,
        required: true
    }
});




const collection = mongoose.model("collection",newSchema)

module.exports=collection