console.log("Node startet");

var Twit = require('twit');
var config = require('./config');

var usersToFollow = [];

var lastCall = 0;
var pageToCheck = 100; // We need to keep track of which pages we have checked. 

var T = new Twit(config);

twitterThings();
setInterval(twitterThings, 60000)

// Function used for set interval. This means we run twitter code every minute, to apply to the standards of limitation
function twitterThings()
{
	if(usersToFollow.length > 0 )
	{
		followAUser(usersToFollow[usersToFollow.length - 1], i);
	}
	else
	{
		getUsers();
	}

	// Function used to get users
	function getUsers()
	{
		console.log("Getting users");

		T.get('users/search', {q: 'donald', page: pageToCheck, count: 20}, gotData)

		function gotData(err, data, response)
		{
			if(err)
			{
				console.log("Something went wrong");
				console.log("error code: " + err);
				console.log("Response: " + response);
			}
			else
			{
				console.log("We succesfully got users");
				if(pageToCheck > 1)
					pageToCheck--;

				sortUsers(data);
			}
		}
	}

	// Function used to follow a specific user ID
	function followAUser(UserID, arrayID)
	{
		console.log("Trying to follow a user");

		T.post('friendships/create', {user_id: UserID, follow: true}, postedDate)

		function postedDate(err, data, response)
		{
			if(err)
			{
				console.log("Something went wrong");
				console.log("error code: " + err);
				console.log("Response: " + response);
			}
			else
			{
				console.log("Now following: " + data.name + " - ID: " + data.id);
				usersToFollow.splice(arrayID, 1);
			}
		}
	}

	// Sort all the users, so we verify that they actually are named Donald and not 'don' or something alike.
	// This is needed because the twitter API dose not support a specific search query.
	function sortUsers(users)
	{
		console.log("sorting users");

		for(var i = 0; i < users.length; i++)
		{
			var nameFlag = false;
			var userName = users[i].name;

			userName = userName.toLowerCase();

			// Check if the username contains Donald.
			if(userName.indexOf('donald') >= 0)
			{
				console.log(userName + " - it contained donald!")
				nameFlag = true;
			}

			// If the name is actually Donald, we start to check if we're following him or about to.
			if(nameFlag == true)
			{
				console.log("added a user to the array");
				// We make sure that we're not abusing the API by keeping to try sending request to people we sent to or are following already.
				if(users[i].follow_request_sent == false && users[i].following == false)
					usersToFollow.push(users[i].id);
			}
		}
	}
}