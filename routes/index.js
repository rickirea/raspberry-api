const express = require('express');
const fs = require('fs');
const router  = express.Router();
//const Gpio = require('onoff').Gpio;
//const LED = new Gpio(4, 'out'); 

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.send('<h1>RaspBerry Pi</h1>');
  //console.log(__dirname);
  fs.readFile('/home/ricardo/Documents/Code/raspberrypi/raspberry-api/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
});

/* POST Blink Test */
// router.post('/blink', (req, res, next) => {
//   try{
//     let blinkInterval = setInterval(()=>{
//       if (LED.readSync() === 0) { //check the pin state, if the state is $
//         LED.writeSync(1); //set pin state to 1 (turn LED on)
//       } else {
//         LED.writeSync(0); //set pin state to 0 (turn LED off)
//       }
//     }, 250);
    
//     setTimeout(() => {
//       clearInterval(blinkInterval); // Stop blink intervals
//       LED.writeSync(0); // Turn LED off
//       //LED.unexport(); // Unexport GPIO to free resources
//     }, 5000);

//     res.status(200).json({message: "Success!!!"});
//   }
//   catch(err){
//     res.status(403).json({message: `Error: ${err}`});
//   }
// });

// function blinkLED() { //function to start blinking
//   if (LED.readSync() === 0) { //check the pin state, if the state is $
//     LED.writeSync(1); //set pin state to 1 (turn LED on)
//   } else {
//     LED.writeSync(0); //set pin state to 0 (turn LED off)
//   }
// }

// function endBlink() { //function to stop blinking
//   clearInterval(blinkInterval); // Stop blink intervals
//   LED.writeSync(0); // Turn LED off
//   LED.unexport(); // Unexport GPIO to free resources
// }

module.exports = router;
