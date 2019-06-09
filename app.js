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
const server = require('http').Server(app);
const io = require('socket.io')(server);

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

server.listen(PORT, console.log(`Listening on ${PORT}`));
//app.listen(PORT, console.log(`Listening on ${PORT}`));

io.on('connection', function (socket) {
  //WebSocket Connection
  var lightvalue = 0; //static variable for current status

  socket.emit('notyStatus', LED.readSync());

  pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    lightvalue = value;
    socket.emit('light', lightvalue); //send button status to client
  });

  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    console.log("Value Noty: ", socket.id + " / " + lightvalue);
    socket.broadcast.emit('notyStatus', lightvalue);

    if (lightvalue != LED.readSync()) {
      LED.writeSync(lightvalue);
      //socket.emit('notyStatus', lightvalue);
    }
  });
});

process.on('SIGINT', function () { //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});

module.exports = app;
