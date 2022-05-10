const bycrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
const JWTD = require('jwt-decode');
const hashing = async(value)=>{
    try {
        let salt = await bycrypt.genSalt(10);
    let hash = await bycrypt.hash(value,salt)
    return hash
    } catch (error) {
        return error
    }
}

const hashCompare = async(password,hashvalue)=>{
    try {
        return await bycrypt.compare(password,hashvalue)
    } catch (error) {
        return error
    }
}

const creatJWT = async({email})=>{
    return await JWT.sign({email},process.env.SECRET_CODE,{expiresIn:'30d'})
}


module.exports={hashing,hashCompare,creatJWT}