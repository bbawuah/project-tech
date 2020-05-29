const mongoose = require('mongoose');

// Dit zijn schemas voor de documenten die ik naar mijn database schrijf
// Mongoose zoekt in mijn database naar 
// collections met dezelfde schema past die direct aan!
// Check routes in server.js

const Movies = mongoose.model("movies", {

    title: {
        type: String,
      },
    
      subtile: {
          type: String,
         
      },
      image: {
        type: Buffer
      },
})

module.exports = Movies