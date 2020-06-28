const express = require('express');
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const Filter = require('bad-words');
const routes = require('./src/routes/movies'); // Laad routes in
const generateMessage = require('./src/chatUtils/messages');


const messages = [];

// Hier laadt ik mongoose in en
// hiermeer connect ik ook direct met mijn database
require('./src/db/mongoose');
const Movies = require('./src/model/Movies');

// Routes
const userRoutes = require('./src/routes/users');

// De path module zorgt ervoor dat de absolute path wordt gebruikt vanaf mijn computer
const partials = `${__dirname}/templates/partials`;
const views = `${__dirname}/templates/views`;

// Configuratie voor hbs
app.set('view engine', 'hbs');
app.set('views', views);
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
  }),
);
app.use(express.static(`${__dirname}/public`));
app.use(routes); // Gebruik routes als middleware

const expressServer = app.listen(port, () => console.log(
  `Express js server has started and is listening on http://localhost:${port}`,
));

const io = require('socket.io')(expressServer);

// Socket expects it to be called with the raw http server
// Express maakt dit achter de schermen, daarom de eigen server

const count = 0;
// Het argument socket is een object met alle data van de gebruiker die is geconnect

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    test: 'test',
  });
});

// Ik heb hier een async funtction van gemaakt zodat ik await kan gebruiken in try/catch block
app.get('/dashboard', async (req, res) => {
  const movies = await Movies.find({});

  console.log(movies[0]);
  console.log(movies[0]._id);

  console.log(req);
  res.render('dashboard', {
    username: 'Gebruiker',
    movie: movies[0],
  });
});

let room__ID = '';

app.get('/chat', (req, res) => {
  // console.log(req);
  room__ID = req.query.room;
  res.render('chat', {
    title: 'party',
    messages
  });
});


app.post('/chat', (req, res) => { 
  console.log('req.body:', req.body)
  const filter = new Filter(); // New instance van filter https://www.npmjs.com/package/bad-words
  const cleanMsg = filter.clean(req.body.message);

  const generatedMessage = generateMessage(cleanMsg)
  messages.push(generatedMessage)
  console.log(messages)
  res.status(200).redirect('/chat')
})

app.get('/chat/frame/:id', (req, res) => { 
  res.render('frame', messages)
})




io.on('connection', (socket) => {
  // Als er een connectie is met socket io doe dan dit..
  console.log('Websocket');

  socket.on('join', () => {
    console.log(room__ID);
    // Hier maak ik een session aan in de vorm van een chat room!
    // De gebruikers komen hierdoor in een aparte chatroom!
    socket.join(room__ID);

    // Zodra de gebruiker in de chatroom komt, stuur dit bericht
    socket.emit('message', generateMessage("Let's get this party started!"));
    // Zodra een nieuwe gebruiker in de room komt stuur dan een notificatie naar de andere gebruiker
    socket.broadcast
      .to(room__ID)
      .emit('message', { text: 'Your Netflix partner has joined!' });
  });
  // Emit is een method die iets kan terug sturen naar de gebruiker
  // Zie chat.js

  // Op het event sendMessage, doe dan hetgeen in de callback..
  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter(); // New instance van filter https://www.npmjs.com/package/bad-words
    const cleanMsg = filter.clean(message);

    console.log(cleanMsg);

    // Als het bericht bad words bevat, Stuur dan de clean message terug met een warning
    if (filter.isProfane(message)) {
      io.emit('message', cleanMsg);
      return callback('Let een beetje op het taalgebruik..');
    }

    // Stuur clean message terug naar de andere gebruiker
    io.to(room__ID).emit('message', generateMessage(cleanMsg));
    callback('Delivered');
  });

  // Wanneer een gebruiker de chat verlaat, verstuur dan een bericht dat de gebruiker weg is
  socket.on('disconnect', () => {
    io.emit('message', { text: 'Your Netflix partner has left!' });
  });
});
