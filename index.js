import express from 'express';
const app = express();
import path from 'path';

/* IMPORT DATABASE */


/* ADD FOR DB - TO GET CONTENT FROM HTML*/
import bodyParser from 'body-parser';
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
/* END OF ADD FOR DB - TO GET CONTENT FROM HTML*/

app.use(express.static('public'))
const __dirname = path.resolve();

import ejs from 'ejs';
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
   res.render('index');
  //res.sendFile(path.resolve(__dirname,'public','index.html'));
});

app.get('/login', (req, res) => {
   res.render('login');
  //res.sendFile(path.resolve(__dirname,'public','workout.html'));
});

app.get('/planner', (req, res) => {
    res.render('planner');
   //res.sendFile(path.resolve(__dirname,'public','workout.html'));
 });

/* Useful Database method to  */


app.listen(3000, () => {
  console.log('Express server initialized');
});
