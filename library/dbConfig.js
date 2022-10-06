const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://sairam77:Sairam2002@sairam.pvjby.mongodb.net/foodDelivery',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
module.exports=connectDB;
