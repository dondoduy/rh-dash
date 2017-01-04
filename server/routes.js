var express = require('express');
var request = require('request');

const apiBase = 'https://api.robinhood.com/';
var router = express.Router();

router.use(function (req, res, next) {
	console.log(req.originalUrl);
	next();
});

router.route('/login')
	.post(function (req, res) {
		var url = apiBase + 'api-token-auth/';
		request.post(url,
			{ form: { username: req.body.username, password: req.body.password } },
			function (error, response, body) {
				res.status(response.statusCode).json(JSON.parse(response.body));
			});
	});

router.post('/logout', function (req, res) {
	var url = apiBase + 'api-token-logout/';
	var headers = { 'authorization': req.header('authorization') };
	request({
		headers: headers,
		uri: url,
		method: 'POST'
	},
		function (error, response, body) {
			res.status(response.statusCode).json(response.body);
		})

});

router.get('/user', function (req, res) {
	var url = apiBase + 'user/';
	var headers = { 'authorization': req.header('authorization') };
	request({
		headers: headers,
		uri: url,
		method: 'GET'
	},
		function (error, response, body) {
			res.status(response.statusCode).json(JSON.parse(response.body));
		})
});

router.get('/', function (req, res) {
	res.json({ message: 'API GET works' });
});

module.exports = router;