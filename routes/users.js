var express = require('express');
var router = express.Router();
const {User} = require('../library/schema');
const JWT = require('jsonwebtoken');
const {hashing,hashCompare,creatJWT} = require('../library/auth')

/* GET users listing. */
router.post('/register', async(req,res)=>{
  let {name,email,password} = req.body;
 try {
  if(!name||!email||!password){
   return res.status(400).json("Enter the all Fields")
  }
  let existUser = await User.findOne({email:email});
  if(existUser){
   return res.status(400).json("Email is already exists!!")
  }else{
    let hash = await hashing(password);
    req.body.password = hash;
    let user = await User.create(req.body)
    if(user){
      res.status(201).json({
        message:"user created successfully",detail:user
      })
    }
  }
 } catch (error) {
  return res.status(500).json("Server Error!!")
 }
})

router.post('/login',async(req,res)=>{
  let user = await User.findOne({email:req.body.email});
  if(user){
 let compare = await hashCompare(req.body.password,user.password)
 if(compare===true){
   let token = await creatJWT({email:req.body.email});
  return res.header('auth',token).json({message:user,Tokens:token});
 }else{
  return res.status(400).send('Invalid Password')
 }
  }else{ 
   return res.status(400).json("user not exist")
  }
})

const validateUser = (req,res,next)=>{
  var token = req.header('auth');
  req.token = token;
  next()
}


router.get('/getAll',validateUser,async(req,res)=>{
  await JWT.verify(req.token , process.env.SECRET_CODE,async(err,data)=>{
    if(err){
    return  res.status(403).json({message:"Token has been Expired"})
    }else{
      let data = await User.find().select(['-password'])
      return res.status(200).json({message:data})
    }
  })
  
})




module.exports = router;
