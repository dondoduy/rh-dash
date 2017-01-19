var express = require('express');
var request = require('superagent');
var async = require('async');

const apiBase = 'https://api.robinhood.com/';
var router = express.Router();

// recursive function to make API calls until all pages have been retrieved
function getNextAccountList(nextUrl, headers, accounts) {
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

router.use(function (req, res, next) {
	console.log(req.originalUrl);
	next();
});

router.route('/login')
	.post(function (req, res) {
		var url = apiBase + 'api-token-auth/';
		console.log(req.body.username);
		request
			.post(url)
			.send({ username: req.body.username, password: req.body.password })
			.set('Accept', 'application/json')
			.end(function (error, response) {
				if (error) { console.log(error); res.status(error.status).send(error.response.text); return; }
				res.status(response.statusCode).json(response.body);
			});
	});
router.post('/logout', function (req, res) {
	var url = apiBase + 'api-token-logout/';
	request
		.post(url)
		.set('authorization', req.header('authorization'))
		.end(function (error, response) {
			if (error) { console.log(error); res.status(error.status).send(error.response.text); return; }
			res.status(response.statusCode).json(response.body);
		});
});
router.get('/userData', function (req, res) {
	async.parallel([
		// get user info
		function (callback) {
			var url = apiBase + 'user/';
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { callback(error); return; }
					callback(false, response.body);
				});
		},
		// get list of accounts
		function (callback) {
			var url = apiBase + 'accounts/';
			var headers = { 'authorization': req.header('authorization') };
			getNextAccountList(url, headers, [])
				.then(accounts => {
					callback(false, accounts);
				})
				.catch(err => { callback(err); return; });
		},
	],
		function (err, results) {
			if (err) { console.log(err); res.status(err.status).send(err.response.text); return; }
			res.send({
				user: results[0],
				accounts: results[1],
			});
		});

});
router.get('/accountDetails', function (req, res, next) {
	var account_number = req.header('account_number');
	if (!account_number) {
		res.status(500).send(JSON.stringify('account_number missing'));
		return next();
	}

	async.parallel([
		// get portfolio info
		function (callback) {
			var url = apiBase + `accounts/${account_number}/portfolio/`;
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { callback(error); return; }
					callback(false, response.body);
				});
		},
		// get positions info
		function (callback) {
			var url = apiBase + `accounts/${account_number}/positions/?nonzero=true`;
			var headers = { 'authorization': req.header('authorization') };
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { callback(error); return; }
					callback(false, response.body);
				});
		}
	],
		function (err, results) {
			if (err) { console.log(err); res.status(err.status).send(err.response.text); return; }
			res.send({
				portfolio: results[0],
				positions: results[1].results,
				quotes: null,
				instruments: null,
			});
		});
});
router.get('/instruments', function (req, res, next) {
	var url_list = req.header('url_list');

	if (!url_list) {	
		res.status(500).send(JSON.stringify('url_list missing'));
		return next();
	}

	url_list = Array.from(JSON.parse(url_list));
	if (!Array.isArray(url_list) || url_list.length <= 0) { return next(); }

	var function_list = url_list.map(function (url) {
		return function (callback) {
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { console.log(url + ' err: ' + error); callback(error); return; }
					callback(false, response.body);
				});
		};
	});

	async.parallel(function_list,
		function (err, results) {
			if (err) { console.log(err); res.status(err.status).send(err.response.text); return; }

			res.send(results);
		});

});
router.get('/quotes', function (req, res) {
	var url = apiBase + 'quotes/?' + req.originalUrl.split("?").pop();

	request
		.get(url)
		.set('authorization', req.header('authorization'))
		.end(function (error, response) {
			if (error) { console.log(error.response.text); res.status(error.status).send(error.response.text); return; }
			res.status(response.statusCode).json(response.body);
		});

});
router.get('/', function (req, res) {
	res.json({ message: 'API GET works' });
});

module.exports = router;