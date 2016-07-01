var cfg = require('./_config'); 
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret);

// Seed the user's OAuth token
Dwolla.setToken(cfg.accessToken);

// use sandbox API environment
Dwolla.sandbox = true;

 
//Enter earnings


var earnings  = (1.23)

var partyOne = (earnings * .25) // Bartholomew
var partyTwo = (earnings * .50) // Jethro
var partyThree = (earnings * .25) // Apollo


items = [
	{
		amount: partyOne,
		destination: 'byuzpwuhsh@example.com',
		destinationType: 'Email',
		notes: 'show at Hi-Dive',
		metadata: {
			'Venue': 'Hi-Dive',
			'Amount': '$500'
			
		}
	},
	{
		amount: partyTwo,
		destination: '812-742-8508',
		destinationType: 'Account',
		notes: 'rooftop DJ Set',
		metadata: {
			'anything_you_want': 'blahhhhh'
		}
	},
	{
		amount: partyThree,
		destination: 'xs7qltz0yi@example.com',
		destinationType: 'email',
		notes: 'Spotify earnings',
		

	}
];

function idNumber(min, max) {
    var idPlease = (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0)
    + (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0) +
    (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0) +
    (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0);
    return idPlease
}



Dwolla.createMassPayJob('Balance', '1234', items, {
	userJobId: idNumber(0,9),
	AssumeCosts: true // sender will assume Dwolla transaction fees for each payment
}, console.log, itemsInfo());

function itemsInfo() {
	console.log("You paid " + items[0].destination + " $" + items[0].amount.toFixed(2) + " for " + items[0].notes)
	console.log("You paid " + items[1].destination + " $" + items[1].amount.toFixed(2) + " for " + items[1].notes)
	console.log("You paid " + items[2].destination + " $" + items[2].amount.toFixed(2) + " for " + items[2].notes)
	//console.log(null.Total); How to access key value pairs from what is returned in console??
	console.log
	
}

// Console output:

// null { Id: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//   UserJobId: 'Some arbitrary id you can specify',
//   AssumeCosts: true,
//   FundingSource: 'Balance',
//   Total: 0.03,
//   Fees: 0,
//   CreatedDate: '2014-08-05T00:01:06Z',
//   Status: 'queued',
//   ItemSummary: { Count: 3, Completed: 0, Successful: 0 } }

/**
 * EXAMPLE 2: 
 *   List all MassPay jobs created by the given user.
 **/

//Dwolla.getMassPayJobs(console.log);

// Console output:

// null [ { Id: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//     UserJobId: 'Some arbitrary id you can specify',
//     AssumeCosts: true,
//     FundingSource: 'Balance',
//     Total: 0.03,
//     Fees: 0,
//     CreatedDate: '2014-08-05T00:01:06Z',
//     Status: 'complete',
//     ItemSummary: { Count: 3, Completed: 3, Successful: 3 } },
//   { Id: '68e22e63-c3cb-45e6-bf04-a37201717e5d',
//     UserJobId: null,
//     AssumeCosts: true,
//     FundingSource: '76fe6c3ff2417eb02a9019c25c9a259d',
//     Total: 10080000,
//     Fees: 504,
//     CreatedDate: '2014-07-24T22:25:18Z',
//     Status: 'complete',
//     ItemSummary: { Count: 2016, Completed: 2016, Successful: 1832 } } ]

/**
 * EXAMPLE 3: 
 *   Get one particular MassPay job, by its Job ID.
 **/
 
//dwolla.getMassPayJob('9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e', console.log);

// Console output:

// null { Id: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//   UserJobId: 'Some arbitrary id you can specify',
//   AssumeCosts: true,
//   FundingSource: 'Balance',
//   Total: 0.03,
//   Fees: 0,
//   CreatedDate: '2014-08-05T00:01:06Z',
//   Status: 'complete',
//   ItemSummary: { Count: 3, Completed: 3, Successful: 3 } }


/**
 * EXAMPLE 4: 
 *   Get all the Items of one particular MassPay job, by providing its Job ID.
 **/

//dwolla.getMassPayJobItems('9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e', console.log);

// Console output:

// null [ { JobId: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//     ItemId: 424790,
//     Destination: 'a@example.com',
//     DestinationType: 'email',
//     Amount: 0.01,
//     Status: 'success',
//     TransactionId: 290124,
//     Error: null,
//     CreatedDate: '2014-08-05T00:06:26Z',
//     Metadata: { arbitrary_info: 'the house tasted good' } },
//   { JobId: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//     ItemId: 424791,
//     Destination: '812-740-4294',
//     DestinationType: 'dwolla',
//     Amount: 0.01,
//     Status: 'success',
//     TransactionId: 290126,
//     Error: null,
//     CreatedDate: '2014-08-05T00:06:26Z',
//     Metadata: { anything_you_want: 'blahhhhh' } },
//   { JobId: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//     ItemId: 424792,
//     Destination: 'a@example.com',
//     DestinationType: 'email',
//     Amount: 0.01,
//     Status: 'success',
//     TransactionId: 290128,
//     Error: null,
//     CreatedDate: '2014-08-05T00:06:26Z',
//     Metadata: null } ]

/**
 * EXAMPLE 5: 
 *   Get one particular Item of one particular MassPay job, 
 *   by providing its Job ID and Item ID.
 **/

//dwolla.getMassPayJobItem('9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e', '424792', console.log);
// Console output:

// null { JobId: '9ed0f61a-5cc9-4f36-a7c1-a37e0001c55e',
//   ItemId: 424792,
//   Destination: 'a@example.com',
//   DestinationType: 'email',
//   Amount: 0.01,
//   Status: 'success',
//   TransactionId: 290128,
//   Error: null,
//   CreatedDate: '2014-08-05T00:06:26Z',
//   Metadata: null }