const express = require("express");
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const routes = require("./src/routes/movies"); // Laad routes in

require("./src/db/mongoose");
const User = require('./src/model/User');
const Movies = require('./src/model/Movies');

// De path module zorgt ervoor dat de absolute path wordt gebruikt vanaf mijn computer
const partials = `${__dirname}/templates/partials`;
const views = `${__dirname}/templates/views`;

app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

app.use(express.json());
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

  const movies = Movies.find({}).then((movies) => {
    console.log(movies)
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
        movies
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
