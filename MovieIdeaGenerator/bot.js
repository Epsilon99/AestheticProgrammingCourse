console.log("Node startet");

var Twit = require('twit');
var config = require('./config'); 

var T = new Twit(config);

var db = require('./testFile.json');

var postTimer = setInterval(function(){ postMessage() }, 6000);
var tickTimer = setInterval(function(){ tick() }, 3000);

var timeToPost = true;
 
tick(); 

//T.post('friendships/create', {user_id: UserID, follow: true}, postedDate);  
// 15 min 900000

function tick()
{	
	if(timeToPost)
	{
		var message = '';
		
		var phrase = db.Phrases[Math.floor(Math.random() * db.Phrases.length)];
		phrase = phrase.split(' ');

		for(var i = 0; i < phrase.length; i++)
		{
			if(phrase[i].charAt(0) === '$')
			{
				phrase[i] = phrase[i].slice(1);
				message += getRandomEntry(phrase[i]) + ' ';
			}
			else
			{
				message += phrase[i] + ' ';
			}
		}

		console.log(message);
		timeToPost = !timeToPost;
	}
}

function postMessage()
{
	timeToPost = true;
}

function getRandomEntry(table)
{
	var tString = '';

	switch(table)
	{
		case 'Roles':
			tString = db.Roles[Math.floor(Math.random() * db.Roles.length)];
			break;

		case 'Actions':
			tString = db.Actions[Math.floor(Math.random() * db.Actions.length)];
			break;

		default:
			console.log("Table dosen't exsist")
	}

	return(tString);
}

function clearTimer(timer)
{
	clearInterval(timer);
	console.log('stop timer');
}

function setTimer(timer, amount)
{
	timer = setInterval(function(){ postMessage() }, amount);
}