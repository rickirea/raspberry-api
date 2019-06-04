const express      = require('express');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({origin:true}))

// default value for title local
app.locals.title = 'RaspBerry Pi';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const index = require('./routes/index');
app.use('/', index);

const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`Listening on ${PORT}`));

module.exports = app;
