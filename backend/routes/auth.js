const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const router = express.Router()
const JWT_SECRET = "Yagyeshis the best person in the world"
router.post('/createuser',[
    body('name', 'Enter a Valid Name').isLength({ min: 3}),
    body('email' , 'Enter a Valid mail-id').isEmail(),
    body('password', 'Password must have atleast 5 characters').isLength({min:5})
],async (req,res)=> {
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

module.exports = router