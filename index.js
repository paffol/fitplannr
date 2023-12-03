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

app.get('/signup', (req, res) => {
    res.render('signup');
   //res.sendFile(path.resolve(__dirname,'public','workout.html'));
 });

app.post('/postal', (req, res) => {
  const city = req.body.cityName;
  const postal = req.body.postalName;
  let number;
  db.list().then(keys => {
    number = keys.length;
    const key = "postal"+number; 
    const both = city + " " + postal;
    add(key, both);
  })
})

/* Useful Database method to  */
function add(key, value){
  db.set(key, value).then(() => {
    printDB();
  })
}

function printDB(){
  db.list().then(keys => {
    console.log("Database contents: ");
    for(let i = 0; i < keys.length; i++){
      db.get(keys[i]).then(value => {
        console.log(keys[i] + ":" + value);
      })
    }
  })
  console.log();
}

app.listen(3000, () => {
  console.log('Express server initialized');
});
