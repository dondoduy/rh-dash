var express = require('express');
var request = require('superagent');
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
		request
			.post(url)
			.send({ form: { username: req.body.username, password: req.body.password } })
			.set('Accept', 'application/json')
			.end(function (error, response) {
				if (error) { console.log(error); res.send(500, error); return; }
				res.status(response.statusCode).json(response.body);
			});
	});

router.post('/logout', function (req, res) {
	var url = apiBase + 'api-token-logout/';
	request
		.post(url)
		.set('authorization', req.header('authorization'))
		.end(function (error, response) {
			if (error) { console.log(error); res.send(500, error); return; }
			res.status(response.statusCode).json(response.body);
		});
});

router.get('/user', function (req, res) {
	var url = apiBase + 'user/';
	request
		.get(url)
		.set('authorization', req.header('authorization'))
		.end(function (error, response) {
			if (error) { console.log(error); res.send(500, error); return; }
			res.status(response.statusCode).json(response.body);
		});
});

router.get('/accounts', function (req, res) {
	let url = apiBase + 'accounts/';
	let headers = { 'authorization': req.header('authorization') };

	getNextAccountList(url, headers, [])
		.then(accounts => {
			res.send(accounts);
		});
});

function getNextAccountList(nextUrl, headers, accounts) {
	console.log('nextUrl=' + nextUrl);
	if (!nextUrl) {
		return Promise.resolve(accounts);
	}

	return new Promise(function (resolve, reject) {
		request
			.get(nextUrl)
			.set(headers)
			.end(function (error, response) {
				if (error) { return reject(error); }
				return resolve(getNextAccountList(response.body.next, headers, accounts.concat(response.body.results)));
			});
	});
}

router.get('/liveData', function (req, res) {
	var account_number = req.header('acctNum');
	async.parallel([
		// get account info
		function (callback) {
			var url = apiBase + `accounts/${account_number}/`;
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { console.log(error); callback(true); return; }
					callback(false, response.body);
				});
		},
		// get portfolio info
		function (callback) {
			var url = apiBase + `accounts/${account_number}/portfolio/`;
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { console.log(error); callback(true); return; }
					callback(false, response.body);
				});
		},
		// get positions info
		function (callback) {
			var url = apiBase + `accounts/${account_number}/positions/`;
			var headers = { 'authorization': req.header('authorization') };
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { console.log(error); callback(true); return; }
					callback(false, response.body);
				});
		}
	],
		function (err, results) {
			if (err) { console.log(err); res.send(500, err); return; }
			res.send({
				account: results[0],
				portfolio: results[1],
				positions: results[2].results,
			});
		});
});

router.get('/', function (req, res) {
	res.json({ message: 'API GET works' });
});

module.exports = router;