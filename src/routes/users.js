const express = require('express');
// Laad Express in
const router = new express.Router(); // Create nieuwe instance of router
const auth = require('../authentication/auth');

// Mongoose models
const User = require('../model/User');


// Api route waarmee ik een nieuwe user aanmaak
router.post('/user', async (req, res) => {
  const user = new User(req.body); // Create new user with data
  const token = await user.generateAuthToken(); // Dit is dus een custom method op mijn mongoose middleware. Zie model/users.js

  try {
    await user.save(); // Save user in database
    console.log({ user, token });

    res.status(201).send({ user, token }); // Stuur object van user en token terug
  } catch (e) {
    console.log(e);
    res.status(400).send(e); // If something goes wrong, send an error back to client
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user); // Zie auth function
});


module.exports = router;
