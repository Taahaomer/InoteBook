// const jwt = require('jsonwebtoken');
// const JWT_Secret = process.env.JWT_SECRET;

// get user from jwt token and id to req object
// const fetchuser = async (req, res, next) => {
//     const token = req.header('auth-token')
//     if(!token) {
//         res.status(401).send({error : "1 Please authenticate using a valid token"})
//     }
//     try{
//         const data = jwt.verify(token,JWT_Secret);

//         const token = req.header("auth-token");

//         next();
//     } catch (error){
//         console.log(error)

//         res.status(401).send({token:token, error : "2 Please authenticate using a valid token"})
//     }
    
// }

// module.exports = fetchuser;

const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {

    const token = req.header("auth-token");

    console.log("Received Token at fetchuser:");
    console.log(token)

    if (!token) {
        return res.status(401).send({
            error: "1 Please authenticate using a valid token"
        });
    }

    try {
        const data = jwt.verify(token, JWT_Secret);

        req.user = data.user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: "2 Please authenticate using a valid token"
        });
    }
};

module.exports = fetchuser;