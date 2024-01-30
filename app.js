const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/public'));

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
const connect = mongoose.connect("mongodb+srv://Pavel:mongopavel@cluster0.fqokvhb.mongodb.net/fitplanr?retryWrites=true&w=majority");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware, used to identify a user by an ID
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//set port that server will run on
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
