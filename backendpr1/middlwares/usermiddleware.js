const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_TOKEN=process.env.JWT_TOKEN;
async function usermiddleware(req,res,next){
    if (req.isAuthenticated && req.isAuthenticated()) {
        req.user = req.user; 
        return next();
    }

    const token = req.header('token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

}
module.exports=usermiddleware;