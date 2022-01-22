var express = require('express');
var todoController = require('./controllers/todoController')
var path = require('path'); 
var objects;

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./'));

todoController(app);


app.listen(3000);



