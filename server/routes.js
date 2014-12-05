var controllers = require('./controllers');
var router = require('express').Router();


// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
var controllers = require('./controllers/controllers.js');
var router = require('express').Router();

for (var route in controllers) {
	if(route === "questions") {
	  router.route("/" + route)
	    .get(controllers[route].get);
	}
	else if(route === "users") {
    router.route("/" + route)
	    .get(controllers[route].get)
	    .post(controllers[route].post);
	}
}

module.exports = router;
