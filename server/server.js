var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var request = require('request');

app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

const apiBase = 'https://api.robinhood.com/';

var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log(req.originalUrl);
	next();
});

router.get('/', function (req, res) {
	res.json({ message: 'new code' });
});

router.route('/login')
	.post(function (req, res) {
		var url = apiBase + 'api-token-auth/';
		console.log(req.body);
		request.post(url,
			{ form: { username: req.body.username, password: req.body.password } },
			function (error, response, body) {
				res.status(response.statusCode).json(JSON.parse(response.body));
			});
	});
	
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
