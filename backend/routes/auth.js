const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_Secret = process.env.JWT_SECRET;

let success=false;
// Route 1 : Route for auth related tasks - no login required

router.post('/createuser', [
    body("name", "Enter a name greater than 3 characters").isLength({min: 1}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password greater than 5 characters").isLength({min:5}),
], async (req,res) => {
    // if there are errors then return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        success=false;
        return res.status(400).json({success,errors: errors.array()})
    }

    try{
        //finding is a user already exists with an email
        let user = await User.findOne({email: req.body.email})
        if(user){
            success=false;
            return res.status(400).json({success,error:"A user with this email already exists"})
        }
        // if new user then create it 

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email
        })
        const data = {
            user:{
                id: user.id,
            }
            
        }
        // signing a token 
        const AuthToken = jwt.sign(data,JWT_Secret) 
        success=true
        res.json({success,AuthToken})
    }

        
    //catching if any error occurs
    catch(error){
        console.log(error.message);
        res.status(500).send("some error occurred");
    }

});


// Route 2 : Route for login a user - no login required
router.post('/loginuser', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can't be blank").exists()
], async (req,res) => {
    // if there are errors then return bad request and the errors
    const errors = validationResult(req);
    

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    // checking if email exists
    try{
        // checking email
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success, error: "Enter correct credentials"})
        }

        //checking password
        const passwordcompare = await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            success=false;
            return res.status(400).json({success, error: "Enter correct credentials"})
        }

        const data = {
            user:{
                id: user.id,
            }
            
        }
        // signing a token 
        success = true
        const AuthToken = jwt.sign(data,JWT_Secret) 
        res.json({success, AuthToken})
        
        
        

    } catch(error){
        console.log(error.message)
        res.status(500).send("Internal server error!");
    }
})

// Route 3 : getting locked in user info using POST "/api/auth/getuser" - login required
router.post('/getuser', fetchuser , async (req,res) => {
    try{
        const userId = await req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
            console.log(error.message)
            res.status(500).send("Internal  server error!");
        }
})

module.exports = router;