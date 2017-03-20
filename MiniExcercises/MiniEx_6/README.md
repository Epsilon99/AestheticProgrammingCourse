# miniex 6: Island-generator

![Screenshot of the project](miniEx6_IslandGenerator.png?raw=true "Screenshot of the project")

For this weeks excersise, I wanted to try out some techniques I have never refined and only grasped in theory; level generation in games. It's a big field, which means I barely scratched the surface this week, but the program is able to generate an islands and differentiate between water and islands and even texture the islands propperly. [here](https://epsilon99.github.io/AestheticProgrammingCourse/MiniExcercises/MiniEx_6/).

I wouldn't call the generation of game levels for 'good' generative art. The idea becomes more so to make something that seems like it's generative, but in fact you till want to apply basic fun-factors in your leveldesign, thus also meaning you can't let the system have too much control over the randomness. I would argue that these ways of generating levels in games (or what ever else you would do with generativity in games), is more an illusion of fresh material.

So how does it work? here comes a step by step guide.
* We generate a grid of cells, that can either be alive or dead. Their state is determined by randomness, where there is a variable that dictates how high procentage a cell have to start alive.
* Now we apply some 'Game of Life'-rules: A living cell, with to few neighbours, starves to death. A deadcell with enough living neighbours becomes a live cell.
* We re-apply the previous step a couple of times, to smooth out the islands the system created.
* Next step is to select the right sprite for the land pieces. Here I used bitmasking (although I didn't work directly with bits and bytes), where you check the living neighbours, which gives a unique ID for each tile.

I did a 'Game of life'-simulator a couple a weeks ago, so I really wanted to optimize that part of the code better this time. Therefore I used a two-dimensional array of booleans, to handle the states of the cells. 

In retrospect, I really wanted to create a UI panel so that the user could experience with the different numbers, seeing how you really experience the system and try to get a deeper understanding.

Since the topic is on generative art, there is a couple of key points, from my perspective, that at briefly mentioned earlier. The thing with the variables in my program, is that I choose them, to give me what I felt was a satisfying outcome. Here I would argue that to some degree, I'm the author of those variables. I choose them for the reason to present you with what I find beautiful. But having the computer handle the variables, to some degree, would put the system in the author role, since I created the oppotunity for the system to take control, without knowing what would happen. But again, my perspective is mainly on games, where I still would argue that the 'chaos' of randomness, can only be metagated by the designer taking control and adjusting to the fun of the game.
