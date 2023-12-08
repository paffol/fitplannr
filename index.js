const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Your routes and other middleware go here

app.get('/', (req, res) => {
  res.render('index'); // Assuming you have an EJS file named 'index.ejs'
});

app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/planner', (req, res) => {
    res.render('planner');
  });
  
app.listen(3000, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
