const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    cartItems : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true
            },
            quantity : {
                type : Number,
                default : 1,
                required : true
            },
            price : {
                type : Number,
                required : true,
                default : 0
            },
            name : {
                type : String,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            createdAt : {
                type : Date,
                default :  Date.now()
            },
            updatedAt : {
                type : Date,
                default :  Date.now()
            }
        }
    ]
})

const Cart = new mongoose.model("Cart",cartSchema);
module.exports = Cart;