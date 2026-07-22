const jwt = require('jsonwebtoken');
const JWT_Secret = "abc123";

// get user from jwt token and id to req object
const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) {
        res.status(401).send({error : "1 Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token,JWT_Secret);
        console.log(req.user)
        console.log(data.user)
        req.user = data.user;
        next();
    } catch (error){
        console.log(error)

        res.status(401).send({error : "2 Please authenticate using a valid token"})
    }
    
}

module.exports = fetchuser;