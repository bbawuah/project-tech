const express = require('express'); //Laad Express in
const router = new express.Router(); // Create nieuwe instance of router

// Mongoose models
const User = require("../model/User");


// Api route waarmee ik een nieuwe user aanmaak
router.post('/user', async (req, res) => {
    console.log(req);
    const user = new User(req.body); //Create new user with data
  
    try {
      await user.save() //Save user in database
      console.log(user);
        res.status(201).send('Created')
    } catch(e){
      console.log(e);
      res.status(400).send(e) //If something goes wrong, send an error back to client
    }
})



module.exports = router;