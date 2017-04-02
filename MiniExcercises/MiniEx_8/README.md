# miniex 8: Flappy bird - Physics Edition
![Screenshot of the project](miniEx8_FlappyBird.png?raw=true "Screenshot of the project")

For this excercise we had to follow through a tutorial, after which we were supposed to add a new function to the program. I choose to follow [Daniel Shiffmans tutorial](https://youtu.be/cXgA1d_E-jY) for a minimalistic flappy bird-clone. [Try my version of it here](https://epsilon99.github.io/AestheticProgrammingCourse/MiniExcercises/MiniEx_8/).

As mentioned, I choose the flappy bird excercise, mainly because I was on a very strict deadline and I do believe I'm better at generating ideas for games, than for example a shader. So I might not have pushed myself to new grounds this week, but what is done, is done.
   In regards of the tutorial, one thing bothered me slightly. Shiffman creates the function to check for collision, from the center point of the cirlce, not the outmost point of the circles periphery. Futhermore, the check he made is firstly checking for the y-position, after we check the x-value. A minor thing, 'computer memeory'-wise, but this means you will often have to check both if-statements, because we can often be inside the boundries of the height of the pipes, without being inside the width. By flipping it, you more often than not, only have to check if we're inside the width, and then we check the heigh. Again minor thing, but it bothered me enough to change if from the original.

My own addition to the game, is a Power Up, or what-ever to call it. It spawns in the gap of every 5th pipe. If you hit the powerup, the game inverts the physics that is applied to the bird. Very simple function, but again, I was on a pretty hard deadline and didn't start early enough to make something crazy.

Regarding the difficulity of the excercise, I have to say was following another guys coding process. I have a completely different approach to writing my game-logic and structure. Just halfway through the exercise, I had to pause the video and 'clean-up' the draw function, since it annoyed me that everything was written in there, without any 'proper' structure. This feeling is also expressed in the previous segment, were I talked about how it annoyed me that the boolean logic was unnecessary most of the time. All in all, I had to restructure some things along and after the tutorial, and I found it tedious and a bit difficult to manage.

## Flowchart
![Flowchart of the program](flowchart.png?raw=true "Flowchart of the program")