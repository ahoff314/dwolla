var cfg = require('./_config'); 
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret);
        

// Seed the user's OAuth token
Dwolla.setToken(cfg.accessToken);

// use sandbox API environment
Dwolla.sandbox = true;

/**
 * EXAMPLE 1: 
 *   Send money ($1.00) to a Dwolla ID 
 **/

//Dwolla.send(cfg.pin, '812-168-4257', 1.00, function(err, data) {
   //if (err) { console.log(err); }
  // console.log(data);
//});

/**
 * EXAMPLE 2: 
 *   Send money ($1.00) to an email address, with a note
 **/
 
var earnings = 10

var partyOne = (earnings * .25).toFixed(2)
var partyTwo = (earnings * .50).toFixed(2)
var partyThree = (earnings *.25).toFixed(2)

// email, variable which is amount, meta data

Dwolla.send(cfg.pin, 'byuzpwuhsh@example.com', partyOne, {destinationType: 'Email', notes: 'Net earnings for April'}, function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});

Dwolla.send(cfg.pin, 'xs7qltz0yi@example.com', partyTwo, {destinationType: 'Email', notes: 'Net earnings for April'}, function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});

Dwolla.send(cfg.pin, 'lol@example.com', partyThree, {destinationType: 'Email', notes: 'Net earnings for April'}, function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});


console.log("This payment has been sent!");
