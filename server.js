const express = require('express');
// Add the express module to your application
const app = express(); // Assign Express app to an constant
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

require('./db/mongodb');

const port = 3000;
const routes = require('./routes/movies'); // Laad routes in

const partial = path.join(__dirname, 'templates/partials');
const views = path.join(__dirname, 'templates/views');

app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partial);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(routes); // Gebruik routes als middleware

app.get('/', (req, res) => {
  res.render('index', {
    test: 'test',
  });
});

app.listen(port, () => console.log(
  `Express js server has started and is listening on port number: ${port}`,
));
