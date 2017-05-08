console.log("Node startet");

var Twit = require('twit');
var config = require('./config'); 

var T = new Twit(config);

var db = require('./testFile.json');

var uniqueEntries = [];

var postTimer = setInterval(function(){ postMessage() }, 6000);
var tickTimer = setInterval(function(){ tick() }, 3000);

var timeToPost = true;
 
tick(); 
 
// 15 min 900000

function tick()
{	
	if(timeToPost)
	{
		var message = '';
		
		var template = getRandomEntry('Template');
		template = template.split(' ');

		for(var i = 0; i < template.length; i++)
		{
			// Table lookup
			if(template[i].charAt(0) === '$')
			{
				var tCriteria;
				var tableLookup = template[i].slice(1);

				if(tableLookup.indexOf(':') >= 0)
				{
					tableLookupOptions = tableLookup.split(':');
					tableLookup = tableLookupOptions[0];
					tCriteria = tableLookupOptions[1];

					message += getRandomEntry(tableLookup, tCriteria) + ' ';
				}
				else
				{
					message += getRandomEntry(tableLookup) + ' ';
				}

				
			}
			// Unique table lookup
			else if(template[i].charAt(0) === '€')
			{
				var tCriteria;
				var tableLookup = template[i].slice(1);

				if(tableLookup.indexOf(':') >= 0)
				{
					tableLookupOptions = tableLookup.split(':');
					tableLookup = tableLookupOptions[0];
					tCriteria = tableLookupOptions[1];
				}

				var returnValue = getUniqueEntry(tableLookup);

				if(returnValue === false)
				{
					var tValue;

					if(tCriteria === undefined)
					{
						tValue = getRandomEntry(tableLookup);
					}
					else
					{
						tValue = getRandomEntry(tableLookup, tCriteria);
					}

					setUniqueEntry(tValue, tableLookup);

					message += tValue + ' ';
				}
				else
				{
					message += returnValue + ' ';
				}
				

			}
			// No table lookup required
			else
			{
				if(template[i].charAt(0) === '.' || template[i].charAt(0) === ',')
				{
					message = message.slice(0, -1);
				}

				message += template[i] + ' ';
			}
		}

		message = message.slice(0, -1);
		console.log(message);
		console.log(message.length);
		console.log(" ");

		clearUniqueEntries();
		timeToPost = !timeToPost;
	}
}

function postMessage()
{
	timeToPost = true;
}

function getRandomEntry(table, criteria)
{
	var tString = '';

	switch(table) 
	{
		case 'Template':
			tString = db.Templates[Math.floor(Math.random() * db.Templates.length)];
			break;

		case 'Role':
			if(criteria.indexOf('DefSingular') >= 0)
				tString = db.Roles[Math.floor(Math.random() * db.Roles.length)].DefSingular;

			else if(criteria.indexOf('IndefSingular') >= 0)
				tString = db.Roles[Math.floor(Math.random() * db.Roles.length)].IndefSingular;

			else if(criteria.indexOf('Plural') >= 0)
				tString = db.Roles[Math.floor(Math.random() * db.Roles.length)].Plural;

			else
				console.log("You didn't specify the gramatic criteria of Roles");
			break;

		case 'Action':
			if(criteria.indexOf('Verb') >= 0)
				tString = db.Actions[Math.floor(Math.random() * db.Actions.length)].Verb;

			else if(criteria.indexOf('ThirdPersonSingular') >= 0)
				tString = db.Actions[Math.floor(Math.random() * db.Actions.length)].ThirdPersonSingular;

			else
				console.log("You didn't specify the gramatic criteria of Action");

			break;

		case 'Adjective':
			tString = db.Adjectives[Math.floor(Math.random() * db.Adjectives.length)];
			break;

		case 'Place':
			tString = db.Places[Math.floor(Math.random() * db.Places.length)];
			break;

		case 'Setting':
			tString = db.Settings[Math.floor(Math.random() * db.Settings.length)];
			break;

		case 'Object':
			if(criteria.indexOf('DefSingular') >= 0)
				tString = db.Objects[Math.floor(Math.random() * db.Objects.length)].DefSingular;

			else if(criteria.indexOf('IndefSingular') >= 0)
				tString = db.Objects[Math.floor(Math.random() * db.Objects.length)].IndefSingular;

			else if(criteria.indexOf('Plural') >= 0)
				tString = db.Objects[Math.floor(Math.random() * db.Objects.length)].Plural;

			else
				console.log("You didn't specify the gramatic criteria of Objects");

			break;

		case 'Actor':
			tString = db.Actors[Math.floor(Math.random() * db.Actors.length)];
			break;

		case 'Genre':
			tString = db.Genres[Math.floor(Math.random() * db.Genres.length)];
			break;

		case 'Genre':
			tString = db.Genres[Math.floor(Math.random() * db.Genres.length)];
			break;

		case 'Event':
			tString = db.Events[Math.floor(Math.random() * db.Events.length)];
			break;

		case 'Concept':
			tString = db.Concepts[Math.floor(Math.random() * db.Concepts.length)];
			break;

		case 'Name':
			tString = db.Names[Math.floor(Math.random() * db.Names.length)];
			break;
		
		case 'Surname':
			tString = db.Surnames[Math.floor(Math.random() * db.Surnames.length)];
			break;

		default:
			console.log("Table: " + table + " dosen't exsist")
	}

	return(tString);
}

function setUniqueEntry(value, table)
{
	var tUniqueEntry = new Entry(value, table);
	uniqueEntries.push(tUniqueEntry);
}

function getUniqueEntry(table)
{
	var tUniqueEntry;

	for(var i = 0; i < uniqueEntries.length; i++)
	{
		if(uniqueEntries[i].table == table)
			tUniqueEntry = uniqueEntries[i].value;
	}

	if(tUniqueEntry === undefined)
	{
		return false;
	}
	else
	{
		return tUniqueEntry
	}
}

function clearUniqueEntries()
{
	uniqueEntries = [];
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

function Entry(value, table)
{
	this.value = value;
	this.table = table;
}