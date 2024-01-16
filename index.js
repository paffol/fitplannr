const collection = require("./mongo");
const express = require('express');
const path = require("path");
const app = express();
const bcrypt = require('bcrypt');
const port = 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/calendar', (req, res) => {
    res.render('calendar')
  });

app.get('/gyms', (req, res) => {
    res.render('gyms')
  });

app.get('/login', (req, res) => {
    res.render('login')
  });

app.get('/nutrition', (req, res) => {
    res.render('nutrition')
  });

app.get('/planner', (req, res) => {
    res.render('planner')
  });

app.get('/signup', (req, res) => {
    res.render('signup')
  });

// Register User
app.post("/signup", async (req, res) => {

  const data = {
      name: req.body.username,
      password: req.body.password
  }

  // Check if the username already exists in the database
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
      res.send('User already exists. Please choose a different username.');
  } else {
      // Hash the password using bcrypt
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; // Replace the original password with the hashed one

      const userdata = await collection.insertMany(data);
      console.log(userdata);
  }

});

// Login user 
app.post("/login", async (req, res) => {
  try {
      const check = await collection.findOne({ name: req.body.username });
      if (!check) {
          res.send("User name cannot found")
      }
      // Compare the hashed password from the database with the plaintext password
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if (!isPasswordMatch) {
          res.send("wrong Password");
      }
      else {
          res.render("home");
      }
  }
  catch {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
