const express = require('express')
const router = express.Router()

router.get('/', (req,res)=> {
    const obj = {
        name : 'y',
        age:18
    }
    res.json(obj)
})

module.exports = router