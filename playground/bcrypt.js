const bcrypt = require('bcrypt');

const myFunc = async () => {
    const password = 'NatchIsLit';
    /*
     Bcrypt expects to be a promise
     .hash verwacht twee argumenten.. Het wachtwoord
     Het tweede argument geeft aan hoevaak het algoritme moet worden gerund
     Ik heb voor 8 gekozen omdat het goed in balans is met security en snelheid

     8 wordt ook aangeraden door de maker van her algoritme 

     Een te hoge waarde is zal veel tijd nemen om de algoritme uit te voeren
     Een te lage waarde zal een zwak wachtwoord genereren
    
    */
const hashedPassword = await bcrypt.hash(password, 8);

console.log(password);
console.log(hashedPassword)

// Omdat hashing one-way is moeten we deze functie gebruiken om de ingevoerde wachtwoord te vergelijken 
// Met wachtwoord in onze database  
const isMatch = await bcrypt.compare(password, hashedPassword)

console.log(isMatch) //Returns a boolean
}

myFunc()