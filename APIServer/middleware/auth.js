const jwt = require('jsonwebtoken');
const config = require('../config/index');

const{JWT_SECRET} = config;

const auth = (req, res, next) => {
    const token = req.header('token')

    if(!token) {
        return res.status(401).json({msg:"토큰이 없어요."});
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        console.log(req.user)
        next()
    } catch (e){
        console.log(e)
        res.status(400).json({msg: "유효하지 않은 토큰"})
    }
};

module.exports = auth;