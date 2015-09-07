require('./env.js');

var express  = require('express');
var app   = express();
var bodyParser = require('body-parser');
var path = require('path');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var params = {screen_name: ''};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

router.use(function(req, res, next) {
    res.header('Content-Type', 'application/json');
    next(); 
});

router.route('/status/timeline').
	get(function(req, res) {
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
    			res.json(tweets);
  			} else {
  				res.send(error);
  			}
		});
});

router.route('/status/home').
  get(function(req, res) {
    client.get('statuses/home_timeline', params, function(error, tweets, response) {
        if (!error) {
          res.json(tweets);
        } else {
          res.send(error);
        }
    });
});

app.get('/api/tweets/search', function(req, res) {
    var query = encodeURIComponent(req.query.q);
    client.get('search/tweets', {q: query}, function(error, tweets, response) {
        if (!error) {
          res.json(tweets);
        } else {
          res.send(error);
        }
    });
    
});

app.get('/api/followers', function(req, res) {
    client.get('followers/list', params, function(error, tweets, response) {
        if (!error) {
          res.json(tweets);
        } else {
          res.send(error);
        }
    });    
    
});


app.post('/api/tweets/send', function(req, res) {
    var status = req.body.text;
    client.post('statuses/update', {status: status},  function(error, tweet, response) {
        if(!error) {
          res.json(tweet);
        }
    });
    
});

app.use('/app', express.static(__dirname + '/app'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});





app.use('/api', router);
app.listen(port);

console.log('TwitterApp running on port ' + port);


