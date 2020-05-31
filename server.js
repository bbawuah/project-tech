const express = require("express");
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const routes = require("./src/routes/movies"); // Laad routes in
const swal = require("sweetalert");

// Hier laadt ik mongoose in en
// hiermeer connect ik ook direct met mijn database
require("./src/db/mongoose");
const Movies = require("./src/model/Movies");

//Routes
const userRoutes = require("./src/routes/users");

// De path module zorgt ervoor dat de absolute path wordt gebruikt vanaf mijn computer
const partials = `${__dirname}/templates/partials`;
const views = `${__dirname}/templates/views`;

// Configuratie voor hbs
app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

// Dit is voor mijn API Routes
app.use(express.json());

app.use(userRoutes);

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

// Ik heb hier een async funtction van gemaakt zodat ik await kan gebruiken in try/catch block
app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    title: "party",
  });
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
