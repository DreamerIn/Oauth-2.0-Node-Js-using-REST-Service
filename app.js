var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

//routers declaration
var routes = require('./routes/index');
var auth = require('./routes/auth');
var fbauth = require('./routes/fbauth');
var users = require('./routes/users');
// Initialize the App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


//defining routes
app.use('/', routes);
app.use('/auth', auth);
app.use('/fbauth', fbauth);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
