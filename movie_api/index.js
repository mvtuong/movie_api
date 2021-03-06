const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();
//const http = require("http")

//Middleware
app.use(express.static('public/documentation.html'));
app.use(morgan("common"));
app.use(bodyParser.json());

let topMovies = [
  {title: "Pans Labyrinth",
  description: "In 1944 Spain, a lonely girl encounters a faun in an ancient maze and must complete three dangerous tasks to achieve immortality.",
  genre: "Science Fiction",
  director: "Guillermo del Toro"},

  {title: "Jaws",
  description: "A giant shark is feeding on the good people of Amity Island and it's up to police chief Martin Brody to hunt down the finned fiend.",
  genre: "Horror",
  director: "Steven Spielberg"},

  {title: "Shrek",
  description: "A grouchy ogre and his jabbering donkey sidekick set out to rescue an imprisoned princess from a scheming lord",
  genre: "Adventure",
  director: "Andrew Adamson"},

  {title: "The last of the Mohicans",
  description: "The Last of the Mohicans is a 1992 American epic historical drama film set in 1757 during the French and Indian War.",
  genre: "Action",
  director: "Michael Mann"},

  {title: "Out of Africa",
  description: "Based on the story of Karen Blixen, who leaves her native Denmark in 1913 to marry a baron and run a coffee plantation in Kenya.",
  genre: "Biography",
  director: "Sydney Pollock"},

  {title: "Waiting to exhale",
  description: "The story centers on four women living in the Phoenix, Arizona area and their relationships with men and one another. All of them are holding their breath until the day they can feel comfortable in a committed relationship with a man.",
  genre: "Comedy",
  director: "Forest Whitaker"},

  {title: "Parasite",
  description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan",
  genre: "Comedy",
  director: "Bong Joon-ho"},

  {title: "Black Panther",
  description: "After his father's tragic death, and the events involving members of the Avengers that followed, T'Challa returned to Wakanda as King",
  genre: "Action",
  director: "Ryan Coogler"},

  {title: "The Godfather",
  description: "The Godfather Don Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business.",
  genre: "Crime",
  director: "Francis Ford Coppola"}
];

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Gets documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Gets the list of data about ALL movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Gets the data about a movie title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movies) =>
    {return movies.title === req.params.title}));
});

// Gets the data about a movie genre
app.get('/movies/:genre', (req, res) => {
  res.json(movies.find((movies) =>
    {return movies.genre === req.params.genre}));
});

// Gets the data about a movie director
app.get('/movies/:director', (req, res) => {
  res.json(movies.find((movies) =>
    {return movies.director === req.params.director}));
});

//Gets data about users
app.get('/users', (req, res) => {
  res.json('users');
});

// Adds data for a new users
app.post('/users', (req, res) => {
  let newUser = req.body;
  if(!newUser.name){
    const message = 'Missing name in request body';
    res.status(400).send (message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Deletes a user from our list by ID
app.delete('/users/:id', (req, res) => {
  let user = user.find((user) => { return user.id === req.params.id });
  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
});

// Updates user favourites
app.put('/users/:username/movies/:_id', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    user.movies[req.params.class] = parseInt(req.params.grade);
    res.status(201).send('Movie ' + req.params.title + ' was assigned to favourites ' + req.params.grade + ' in ' + req.params.class);
  } else {
    res.status(404).send('Movie ' + req.params.name + ' was not found.');
  }
});


// listen for requests
app.listen(8080, function(){ console.log('Server listening on 8080...')});
