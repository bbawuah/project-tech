const express = require("express");
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const path = require("path"); // De path module zorgt ervoor dat de absolute path wordt gebruikt vanaf mijn computer
const http = require("http");
const hbs = require("hbs");

require("dotenv").config();

const port = process.env.PORT || 3000;
const routes = require("./src/routes/movies"); // Laad routes in

// De path module zorgt ervoor dat de absolute path wordt gebruikt vanaf mijn computer
const partials = `${__dirname}/templates/partials`;
const views = `${__dirname}/templates/views`;
app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

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
