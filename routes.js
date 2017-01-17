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
	console.log('userData request received');
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
		// get account info
		function (callback) {
			var url = apiBase + `accounts/${account_number}/`;
			request
				.get(url)
				.set('authorization', req.header('authorization'))
				.end(function (error, response) {
					if (error) { callback(error); return; }
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
				account: results[0],
				portfolio: results[1],
				positions: results[2].results,
			});
		});
});
router.get('/quotes', function (req, res) {
	// var symbols = req.query.symbols;
	// console.log(typeof(symbols));
	// console.log(!symbols);
	// //console.log(symbols.length);
	// if (!symbols || Object.keys(symbols).length <= 0) {
	// 	res.status(401).send('No symbols found');
	// 	return;
	// }
	// console.log(Object.keys(symbols).length);
	// symbols = symbols.split(',');
	//var url = apiBase + 'quotes/?symbols=' + symbols.join();
var url = apiBase + 'quotes/?' + JSON.stringify(req.query.symbols);
	console.log(url);

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