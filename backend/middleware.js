const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')
function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message: "Authentication failed!"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decodedToken = jwt.verify(token,  JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    }catch(error){
        console.log(error);
        if(error.message.includes('invalid token')){
            return res.status(403).json({message: "Token is invalid"})
        }
        return res.status(403).json({})
    }

}
module.exports = {authMiddleware};