const express = require('express');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');  // Remove
const mysql = require('mysql'); // Remove


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true})); // New

app.use(express.json()); // New

app.use(express.static('public'));

app.engine('hbs', exphbs.engine({ extname: '.hbs' })); // v5.3.4
app.set('view engine', 'hbs'); // v5.3.4

app.get('',(req,res)=>{
    res.render('home');
});


const pool = mysql.createPool({
    connectionLimit : 100,
    host            :process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});

pool.getConnection((err, connection) =>{
    if(err) throw err;   //not connected
    console.log('Connected as ID'+ connection.threadId);

});

// app.get('', (req, res)=>{
//     console.log('home');
// });

const routes = require('./server/routes/user');
app.use('', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));