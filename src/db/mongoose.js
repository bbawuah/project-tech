//Ik vind mongoose zo sick!! ik kan hiermee gewoon mijn database in een seperate file plaatsen
// En die inladen in server.js!!

// Check mijn models folder
const mongoose = require("mongoose");



mongoose.connect('mongodb+srv://brian-tech:brianbaw1@cluster0-qkwhm.mongodb.net/project-tech', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
});

