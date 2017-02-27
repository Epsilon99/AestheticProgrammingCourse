# miniex 3: Throbber invaders!

Try the game:
https://epsilon99.github.io/AestheticProgrammingCourse/MiniExcercises/MiniEx_3/

My design focuses on entertaining people, instead of just halting the entertainment process. Much like Google Chrome implemented an endless runner game, on their 404-pages. I like the idea of rethinking the tedious act of waiting on computer processes. If I am prompted with a static loading process, which I can do nothing to neither understand nor avoid, then how am I supposed to be in focus as the user? The throbber design is made to tell the user that a process is going on, which you will have to wait out. In my design, you have the option to choose to play a game, while the buffering is going on. 
The game itself is not done at this stage it is merely a proof-of-concept. The game is an endless wave-based shooter, in which you play one of the throbber circles, trying to stop red throbber circles from hitting your base. 

I knew that I would have to cut some corners, in order to make the deadline. Therefore I made some decisions, based on my knowledge of making games.
* I made every shape a circle, because creating hit detection is much more accessible with circles, rather than squares or complex polygons.
* Using 2D vectors for everything that has x and y based coordinates. Primarily for the math I needed to do to check distances and normalized directional vectors.
* Keep the design simple; no powerups, no scaling of the game, no special enemies. 

I ran into some problems with arrays, which I am going to have to look more into. The problem is currently messing with the game. An example would be the for-loop that checks for bullets hit detection. I run through bullets and enemies, where I save the index for the entry I’m going to delete. But I don’t seem to work, whereas it works in deleting bullets exiting the screen. 

A last thing that I would have loved to implement was a delta time function. This makes for a more smooth experience, where you make game movements relative to time, rather than framerate. Right now the game has some lag issues, due to frames not being consistent in p5. 

## Programming as a digital culture
The throbber is widely known and used in many apps, websites and other digital artefacts. We encountered an issue with loading webpages and telling that user a process was happening and that waiting was required.

The thing here is that we as programmers can solve issues in our culture, both visually and technically. User-centered design and user experience is keyword in the industry today. That means that we as programmers have a collective responsibility for crafting new visual ques for programs and maybe invent new standards. But as we go along, we might also have to reevaluate current standards and reinvent the wheel. In my project I’m challenging the throbber as we know it, because I don’t see that there are any correlation between engaging the user and using a static symbol with no interactions, as a way of dealing with buffering or load times.

**Edit** - I fixed some of the issues I pointed out with arrays. I was going about it correctly, but I messed up in the code by using the wrong array. I also added life into the game, a game over screen, and a reset function. There are more things I want to add, for obtaining a better feel of the game, such as; adding the faded throbber circles when moving the curser, delta time (which I pointed out earlier) and a scale for the spawnrate.