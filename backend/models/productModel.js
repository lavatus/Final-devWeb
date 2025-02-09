const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLenght:[8,"asdsad"]
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter product Category (Male/Female)"]
    },

    brand:{
        type:String,
        required:[true,"Please Enter product Brand"]
    },

    color:{
        type:String,
        required:[true,"Please Enter product Color"]
    },

    strap:{
        type:String,
        required:[true,"Please Enter product Strap"]
    },

    stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLenght:[4,"asddasdasdsad"],
        default:1
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema);