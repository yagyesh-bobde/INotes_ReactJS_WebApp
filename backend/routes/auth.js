const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const router = express.Router()

// Never harcode this type of variables
const JWT_SECRET = "Yagyesh is the best person in the world"


// ROUTE 1 : For Creating user 
router.post('/createuser',[
    body('name', 'Enter a Valid Name').isLength({ min: 3}),
    body('email' , 'Enter a Valid mail-id').isEmail(),
    body('password', 'Password must have atleast 5 characters').isLength({min:5})
], async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{ // Check if the user email already exists 
    let user = await User.findOne({email: req.body.email})
    if (user) {
        // console.log(user)
        return res.status(400).json({error: 'This email is already registered with us.'})
    }
    else{

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)
        // create a new user 
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

    const data = {
        user: {
            id:user.id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    //   res.json(user)
    // res.send(user)
    res.json({authToken})
    }}

    catch(error) {
        console.error(error.message)
            res.status(500).send('Some error occured')
        }
})


// ROUTE3 : Create a login endpoint
router.post('/loginuser',[
    body('email' , 'Enter a Valid mail-id').isEmail(),
    body('password', 'Password must have atleast 5 characters').exists()
],async (req,res)=> {
    const errors = validationResult(req);
    let success = false
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() , success:success });
        }

        const {email , password } = req.body
    
        try {
        const user = await User.findOne({email: email})
        if (!user) {
            console.log("Error: Email not present in the database")
            return res.status(400).json({ error: 'Incorrect credentials', success: success})
        }
        const passwordCompare = await bcrypt.compare(password , user.password)
        if (!passwordCompare){
            console.log("Password not correct")
            return res.status(400).json({ error: 'Incorrect credentials', success: success})
        }
        const payload = {
            user: {
                id:user.id
            }
        }
        
    const authToken = jwt.sign(payload, JWT_SECRET)
    success = true;
    res.json({success,authToken})

    } catch (error) {
            return res.status(500).send({ error: "Internal Server Error", success: success})
    }
})


// ROUTE 3: Get Logged it user details
router.post('/getuser',fetchuser,async (req,res)=> {
try {
   const  userID = req.user.id
   const user = await User.findById(userID).select("-password")
   res.send(user)
} catch (error) {
    res.status(500)
}

})


module.exports = router