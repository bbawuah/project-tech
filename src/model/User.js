const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

/*
Om gebruik te maken van mongoose middlewares moet ik mijn eigen schema aanmaken
en die vervolgens meegeven aan het user model.

Op de userSchema kan ik dam verschillende methods op uitvoeren


*/


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 16) {
        throw new Error("Je bent te jong voor deze applicatie");
      }
    },
  },
  password: {
    type: String,
  },
});




// Creating custom method on our userSchema
// https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html

/**
 * 
 * 
 * Each Schema can define instance and static methods for its model.
 * 
 * 
 * Statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
 */
userSchema.methods.generateAuthToken = async function () {

}




/**
 
 pre() is een functie die ik nu kan roepen op mijn userSchema
 pre() is een method die wordt afgevuurd VOOR een event
 Pre vraagt de arguments. Het eerste argument is het event. 
 in mijn geval is dat save. Dus voor het saven moet er iets gebeuren

 Het tweede argument is de functie die moet worden uitgevoerd

 De functie wordt in een andere contect geroepen. 
 Een arrow function gaat hier veel gezeik opleveren omdat die geen this binding hebben
 */
userSchema.pre("save", async function (next) {
  /*
  Hetgeen wat ik meegeef aan de model. Dat is dus de user met de data van req.body
  zie server.js voor de kleine api route waar ik users aanmaak
  */
  const user = this;

/*

Alleen het wachtwoord wijzigt willen we de hash functie toepassen.
Dus niet elke keer als de user inlogt!
*/
  if(user.isModified('password')){

    user.password = await bcrypt.hash(user.password, 8) //Zie playground brcypt.js
  }

  //Net als met middlewares in express, wordt next geroepen als de middleware is afgerond en model in dit geval kan worden opgeslagen
  // Als next niet wordt geroepen, blijft de middleware hangen
  next(); 
});

// Data validation & data sanitization
const User = mongoose.model("User", userSchema);

module.exports = User;
