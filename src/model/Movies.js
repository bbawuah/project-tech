const mongoose = require('mongoose');


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