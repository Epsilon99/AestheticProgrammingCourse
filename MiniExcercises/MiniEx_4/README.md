# miniex 4: Game of Life

![Screenshot of the project](miniEx4_GameOfLife.png?raw=true "Screenshot of the project")

Try the game [here](https://epsilon99.github.io/AestheticProgrammingCourse/MiniExcercises/MiniEx_4/)

I made an implementation of Conway's Game of Life, which is a zero-player game. This means that once the program is running there is no player, only calculation in the laws of the game. 

The game has 2 states. The editor state and the playing state. In the editor, it's posible for the player to make the pattern of current generation in the Game of Life. The other state is playing, which, in timed intervals, evolves the pattern the player choose.

You can switch from one state to the other, using the your mouse on the GUI. 


A bit of the Game of Life:
A cell can be either populated or unpopulated. White cells are unpopulated and black cells are populated. While in editor mode, you can click the cells to either populate or unpopulate them.

Once the game is on, following rules are applied to each cell:
* Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

In the nature of the game, a generation can reach 3 states: dead, alive or repeating.
Try playing around with the Game of Life, to see if you can reat a repeating generation, which creates an everlasting loop.

There are multiple creations in the Game of Life, and you can check the Wikipedia to see some of these creations.
[Wikipeadia: Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life)

## About the coding process
I started of by making the cell structure, since it's the backbone of the project. Alot of the cell management, needs to be easy. Thus I made the creation of cells in a for-loop, nested in another for-loop. Creating each row, from left to right, in an order from top to bottom. This means that it's possible to find a cell by its index. 0; is the first cell (in the top to the left), 1; is the cell next to it etc. This is used when checking for the mouse position in the grid.
Another indexation I made, was the indexX and indexY. This is for checking the neighbours of a cell. I could have calculated this from the previous mentioned indexation, but I didn't think of it in the process. There is room for optimazion here, instead of having to ways of indexing a cell and causing more memory to be used in the computer.

After creating the indexation of cells and relations to it's neighbours, I made the user input in the editor-mode. This would come in handy when making the iteration of the game, since I would be able to test the game as it was final. Instead of having to script an instance and then test the game iteration.

Finally I tweaked the game and the variables and added a GUI element, which made it eaiser for the user to interact with. Instead of having to write 'Press space to play'. 

The code is a bit messy this time, because I had to figure out things as I went through it. I would consider going back and tweaking the code. 

As last time, I'm making a to-do list. Mostly for myself, but feel free to play around with it aswel:
* Making 'presets' to explain the game
* Having a standard 'preset' entered when opening for the first time.
* Making changes to the color scheme (unpopulated and populated cells) over time.
* Making the player choose the time inbetween updates (maybe a slider).
* Making the player set the grid size of the game.