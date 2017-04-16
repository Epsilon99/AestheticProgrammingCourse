# miniex 9: Donald Follower

![Screenshot of the project](miniEx9_DonaldFollower.png?raw=true "Screenshot of the project")

In this weeks mini excercise, me and [Rolf](https://github.com/OorthianEmissary/) made a twitter-bot called [@FollowerDonald](https://twitter.com/FollowerDonald). The bot is pretty simple, it finds users on twitter called Donald and follows them.

The program is written with node.js in mind, since you need OAuth when using the twitter API. This also means that you would have to download the program from github and run it through node.js. BUT, we did not include our config file, sinces that would mean that people could missuse our API-key for the account. So if you want to check it out, registre an app on the Twitter API and put in your information in a file called config.js in the root of the project. Check out the config_skabelon.js to see the template for the config file.
  You can also have a look at the screenshot of the project on the top of this site, since it shows how the command-prompt will look when running the program.

The program ask for users with the search query "Donald", which it then processes with the following two questions: 
* Is the users name actually Donald? This is needed because the search function at twitter is not strict, meaning that it could be something else in the profile that contains Donald.
* Have we added the user already?

After the program get a list of users, it adds all users ID to an array. So when the program detects no users in the array, it goes forth and request new users itself. If there is no users to add, it takes the last entry of the array and folllows it.

The program runs every minute, because the Twitter API have a limit of 15 request per 15 min. So in order for the program not to violate the limitation, we only request or post the API every minute.

## Reflection on 'big data'
Big data is what it states in its name; Big. I'm sure that there are more twitter-users named Donald, than the 779 users we found, at the time I'm writing this. But the API is limited by the search function, which dosen't allow me to search for users through specific cretias, because the search function is actually made for searching tweets, or so it seem. 

Working with the API's are fun and allows you to be creative, futhermore it allows for a glimpse in the 'black box', that we so often mention. Because tinkering with, as an example, the API for twitter, allows you to recieve a JSON with user data. This means that you know see a part of the whole system, what data do they use and how do they structure it? Another example of this was New York Times API, which showed a structure of articles containg media and how multiple images for various parts of the site, was structured in the article it self (or the serilized data version of the article).

API's are very important for how we work with software and programs today, since this means that we don't have to invent everything on our own, but can use multiple services when coding a mobile-apps, websites etc. But API's can also help us think about aestehthics in larger, already integrated, systems.