// Include server dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Require mongoose schema
var Article = require('./models/article');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// MongoDB configuration
mongoose.connect();
var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function() {
	console.log("Mongoose connection successful.");
});

// Main route.  This route will redirect to rendered React app
app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});


// Listener 
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});