var express = require('express');
var request = require('request');
var async = require('async');

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
	request({ headers: headers, uri: url, method: 'POST' },
		function (error, response, body) {
			res.status(response.statusCode).json(response.body);
		});
});

router.get('/user', function (req, res) {
	var url = apiBase + 'user/';
	var headers = { 'authorization': req.header('authorization') };
	request({ headers: headers, uri: url, method: 'GET' },
		function (error, response, body) {
			res.status(response.statusCode).json(JSON.parse(body));
		});
});

router.get('/headerInfo', function (req, res) {
	async.parallel([
		// get user info
		function (callback) {
			var url = apiBase + 'user/';
			var headers = { 'authorization': req.header('authorization') };
			request({ headers: headers, uri: url, method: 'GET' },
				function (error, response, body) {
					if (error) { console.log(error); callback(true); return; }
					obj = JSON.parse(body);
					callback(false, obj);
				});
		},
		// get accounts info
		function (callback) {
			var url = apiBase + 'accounts/';
			var headers = { 'authorization': req.header('authorization') };
			request({ headers: headers, uri: url, method: 'GET' },
				function (error, response, body) {
					if (error) { console.log(error); callback(true); return; }
					obj = JSON.parse(body);
					callback(false, obj);
				});

		}
	],
		function (err, results) {
			if (err) { console.log(err); res.send(500, err); return; }
			res.send({
				user: {
					id: results[0].id,
					username: results[0].username,
					first_name: results[0].first_name,
					last_name: results[0].last_name
				},
				accounts: {
					account_number: results[1].results[0].account_number,
					cash: results[1].results[0].cash,
					cash_available_for_withdrawal: results[1].results[0].cash_available_for_withdrawal,
					uncleared_deposits: results[1].results[0].uncleared_deposits,
					unsettled_funds: results[1].results[0].unsettled_funds,
					buying_power: results[1].results[0].buying_power
				},
				urls: {

				}
			});
		});
});

// router.get('/portfolio', function (req, res) {
// 	var url = apiBase + 'portfolio/';
// 	var headers = { 'authorization': req.header('authorization') };
// 	request({ headers: headers, uri: url, method: 'GET' },
// 		function (error, response, body) {
// 			if(error) { console.log(error); res.send(500, error); return;}
// 			console.log(body);
// 			obj = JSON.parse(body);
// 			res.send({
// 				portfolio: {
// 					market_value: obj.market_value,
// 					equity: obj.equity,
// 					extended_hours_market_value: obj.extended_hours_market_value
// 				}
// 			});
// 		});
// });

router.get('/', function (req, res) {
	res.json({ message: 'API GET works' });
});

module.exports = router;