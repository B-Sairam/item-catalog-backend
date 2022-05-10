const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false},
    pic:{type:String}


},{
    timestamps:true,
})  

const productSchema = mongoose.Schema({
    title:{type:String,unique:true},
    des:{type:String},
    img:{type:String},
    category:{type:String},
    price:{type:String},
    offprice:{type:String},
    instock:{type:Boolean,default:true},
    offertype:{type:String},
    selected:{type:Boolean,default:false},
    ratings:{type:String},
    warranty:{type:String},
    brand:{type:String},
    color:{type:String},
    arrival:{type:String},
})
const orderSchema = mongoose.Schema({

    addres:{type:String},
    brand:{type:String},
    category:{type:String},
    color:{type:String},
    image:{type:String},
    name:{type:String},
    offprice:{type:String},
    quan:{type:String,default:"1"},
    sizes:{type:String},
    title:{type:String},
    total:{type:Number},
    users:{type:String},

})

const User = mongoose.model("User",userSchema);
const Products = mongoose.model("Products",productSchema)
const Orders = mongoose.model("Orders",orderSchema)
module.exports = {User,Products,Orders}