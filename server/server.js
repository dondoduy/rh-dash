var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var router = require('./routes');

app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
