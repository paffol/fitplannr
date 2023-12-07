const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Your routes and other middleware go here

app.get('/', (req, res) => {
  res.render('index'); // Assuming you have an EJS file named 'index.ejs'
});

app.get('/calendar', (req, res) => {
    res.render('calendar')
  });

app.get('/gyms', (req, res) => {
    res.render('gyms')
  });

app.get('/login', (req, res) => {
<<<<<<< Updated upstream
    res.render('login');
=======
    res.render('login')
  });

app.get('/nutrition', (req, res) => {
    res.render('nutrition')
  });

app.get('/planner', (req, res) => {
    res.render('planner')
>>>>>>> Stashed changes
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
