const express = require('express')
const User = require('../models/User')

const router = express.Router()
const { body, validationResult } = require('express-validator');

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
        // create a new user 
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
    //   res.json(user)
    res.send(user)
    }}

    catch(error) {
        console.error(error.message)
            res.status(500).send('Some error occured')
        }
})

module.exports = router