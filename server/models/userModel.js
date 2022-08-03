
const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        required:true,
    },
    gender: {
        type: String,
        required:true,
    },
    image: {
        type:String
    },
    role : {
        type: String, 
        enum : ["admin", "user"],
        default: "user"}
})
module.exports=mongoose.model('user',userSchema)