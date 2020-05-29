//Ik vind mongoose zo sick!! ik kan hiermee gewoon mijn database in een seperate file plaatsen
// En die inladen in server.js!!

// Check mijn models folder
const mongoose = require("mongoose");



mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
});

