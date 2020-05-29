const express = require("express");
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const routes = require("./src/routes/movies"); // Laad routes in
const swal = require('sweetalert');

// Hier laadt ik mongoose in en 
// hiermeer connect ik ook direct met mijn database
require("./src/db/mongoose");
const User = require('./src/model/User');
const Movies = require('./src/model/Movies');

// De path module zorgt ervoor dat de absolute path wordt gebruikt vanaf mijn computer
const partials = `${__dirname}/templates/partials`;
const views = `${__dirname}/templates/views`;

// Configuratie voor hbs
app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

// Dit is voor mijn API Routes
app.use(express.json());

// Dit is   
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(express.static(`${__dirname}/public`));
app.use(routes); // Gebruik routes als middleware


app.get("/", (req, res) => {
  res.render("index", {
    test: "test",
  });
});

app.get("/chat", (req, res) => {
  res.render("chat", {
    title: "party",
  });
});

app.post("/dashboard", (req, res) => {
  console.log(req.body);

  const user = new User(req.body);  
  const movie = Movies.findOne({title: 'Breaking Bad'}).then((movie) => {
    console.log(movie.image)

    // 
  }).catch((e) => {
    console.log(e)
  })


  user
    .save()
    .then(() => {
      console.log(user);
      res.status(201).render( "dashboard", {
        title: "Dashboard",
        user,
        movie
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e)
    });
  console.log(req.headers);
});

const expressServer = app.listen(port, () =>
  console.log(
    `Express js server has started and is listening on http://localhost:${port}`
  )
);

//Socket expects it to be called with the raw http server
// Express maakt dit achter de schermen, daarom de eigen server
const io = require("socket.io")(expressServer);

io.on("connection", (res) => {
  console.log("Websocket", res);
});
