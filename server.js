const express = require("express");
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const routes = require("./src/routes/movies"); // Laad routes in
const cookieParser = require('cookie-parser');


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

// Gebruik cookieparser
app.use(cookieParser());

// Dit is voor mijn API Routes dit doet als ik het goed heb hetzelfde als body-parser maar toch heb ik ze allebei nodig
app.use(express.json());

// Hier gooi ik de api routes in een middleware
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

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    test: "test",
  });
});

// Ik heb hier een async funtction van gemaakt zodat ik await kan gebruiken in try/catch block
app.get("/dashboard",(req, res) => {
  res.render("dashboard", {
    title: "party",
    username: "Gebruiker"
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


let count = 0;
// Het argument socket is een object met alle data van de gebruiker die is geconnect
io.on("connection", (socket) => {
  console.log("Websocket");

  // Emit is een method die iets kan terug sturen naar de gebruiker
  // Zie chat.js
  socket.emit('message', 'Welcome!')

  socket.on('increment', () => {
    count++
    socket.emit('countUpdated', count)
  })

  socket.on('sendMessage', (message) => {
    console.log(message)

    socket.emit('message', 'We have received your message!')
  })
});


