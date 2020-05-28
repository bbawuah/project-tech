const mongoose = require("mongoose");

// Data validation & data sanitization
const User = mongoose.model("User", {
    username: {
      type: String,
      required: true
    },
  
    age: {
        type: Number,
        required: true,
        validate(value){
            if(value <= 16){
                throw new Error("Je bent te jong voor deze applicatie")
            }
        }
    },
    password: {
      type: String,
    },
  });
  

  module.exports = User;