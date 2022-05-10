var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const {Products,Orders} = require('../library/schema');

router.post("/createproduct", async(req,res)=>{
    try {
        let existProduct = await Products.findOne({title:req.body.title});
        if(existProduct){
            return res.status(400).json("Product is already exists!!")
        }else{
            let product = await Products.create(req.body);
            if(product){
                return res.status(201).json("Product is Created") 
            }
        }
    } catch (error) {
        return res.status(500).json("Server Error!!")
    }
})

router.get('/getproducts',async(req,res)=>{
    try {
        let data = await Products.find();
        return res.status(200).json({message:data})
    } catch (error) {
        return res.status(500).json({message:"Server error in Products"})
    }
})

router.post('/orders',async(req,res)=>{
    try {
        let product = await Orders.create(req.body);
        if(product){
            return res.status(201).json("order Placed") 
        }
    } catch (error) {
        return res.status(500).json("Server Error in Ordering !!")
    }
})
router.get('/getorders',async(req,res)=>{
    try {
        let product = await Orders.find();
        if(product){
            return res.status(201).json({message:product}) 
        }
    } catch (error) {
        return res.status(500).json("Server Error while Ordering !!")
    }
})



router.delete("/delorders/:id", async (request, response) => {
    try {
      const order = await Orders.findByIdAndDelete(request.params.id);
  
      if (!order) response.status(404).send("No item found");
      response.status(200).send(order);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = router;
