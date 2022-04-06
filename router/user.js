const express = require("express");
const router = express.Router()
const uss= require('../models/uss')
const { body, validationResult } = require('express-validator');

router.get('/', async(req,res) => {
    try{
           const aliens = await uss.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
 
})

router.post('/',body('username').notEmpty(),
body('password').isLength({ min: 5 }), async(req,res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    //const dis = new uss(req.body)
    const alien = new uss({
        username: req.body.username,
        password: req.body.password
    })

    try{
        const a1 = await alien.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.get('/:id', async(req,res) => {
    try{
           const alien = await uss.findById(req.params.id)
           res.json(alien)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.patch('/:id',body('password').isLength({ min: 5 }),async(req,res)=> {

    const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

    try{
        const alien = await uss.findById(req.params.id) 
        alien.username = req.body.username
        alien.password = req.body.password
        const a1 = await alien.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})




module.exports = router