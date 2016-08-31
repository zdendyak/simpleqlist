var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('./server/config/main');
var passport = require('passport');

var app         = express();
//connect to database
mongoose.connect(config.database);

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));

app.use(passport.initialize());
require('./server/config/passport')(passport);

app.use(express.static(__dirname + '/public'));


var index = require('./server/routes/index');
var auth = require('./server/routes/auth');
var api = require('./server/routes/api')(passport);

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);



// Start the server
app.listen(config.port);
console.log('Listening on port: ' + config.port);