var curMap = [];
var newMap = [];

var checkboxes = [];

var rows = 15;
var colms = 15;

var checkboxSize = 20;
var mapOffsetX = 100;
var mapOffsetY = 100;

var snake = [];
var startLength = 3;

var fruitPosition;

var chosenInput;

var areWePlaying = true;
var gameTimer = 0;
var curTickInterval;
var startTickInterval = 500;
var tickChangeamount = 0.9732;

var debugCounter = 0;

function setup() {
	initilizeMap(curMap, true);
	initilizeMap(newMap, false);
	initilizeSnake();
	placeNewFruit();

	gameTimer = Date.now();
	curTickInterval = startTickInterval;
}

function draw() {
	if(areWePlaying)
		gameHandler();
}

function initilizeMap(map, withCheckBoxes)
{
	for(var i = 0; i < colms; i++)
	{
		for(var j = 0; j < rows; j++)
		{			
			map.push([j,i]);
			map[i][j] = true;

			if(withCheckBoxes)
			{
				tCheckbox = createCheckbox(' ', false);
				tCheckbox.position(mapOffsetX + (checkboxSize * j), mapOffsetY + (checkboxSize * i));
				tCheckbox.class('emptySpace');

				checkboxes.push(tCheckbox);
			}
		}
	}
}

function gameHandler()
{
	if(Date.now() > gameTimer)
	{
		gameTick();
		gameTimer = Date.now() + curTickInterval;
	}
}

function adjustTickTimer()
{
	curTickInterval *= tickChangeamount;
}

function gameTick()
{
	moveSnake();
	updateMap();
}

function moveSnake()
{
	for(var i = snake.length - 1; i >= 0; i--)
	{
		snake[i].move();
	}
}

function extendSnake()
{
	tSnakeSegment = new SnakeSegment(snake[snake.length-1].x, snake[snake.length-1].y, snake[snake.length-2]);
	snake.push(tSnakeSegment);
}

function die()
{
	areWePlaying = false;
	gameOver = createP('Game over - your score: ' + (snake.length - 3));
	gameOver.position(100,60);
}

function keyPressed()
{
	if(areWePlaying)
		gameInput(keyCode);
}

function gameInput(key)
{
	chosenInput = key;
}

function placeNewFruit()
{
	var positions = [];

	for(var i = 0; i < colms; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			if(curMap[j][i] == true)
			{
				var tpos = createVector(j,i);
				positions.push(tpos);
			}

		}
	}

	fruitPosition = positions[Math.floor(random(0, positions.length))];
}

function initilizeSnake()
{
	for(var i = 0; i < startLength; i++)
	{
		var spawnPointX = Math.floor(rows * .5);
		var spawnPointY = Math.floor(colms * .5);

		//Create the head of the snake
		if(i == 0)
		{
			var tSnakeSegment = new SnakeSegment(spawnPointX, spawnPointY, undefined);
			snake.push(tSnakeSegment);
		}
		else
		{
			var tSnakeSegment = new SnakeSegment(spawnPointX, spawnPointY, snake[i-1]);
			snake.push(tSnakeSegment);
		}
	}
}

function updateMap()
{
	for(var i = 0; i < colms; i++)
	{
		for(var j = 0; j < rows; j++)
		{			
			fruitTestVec = createVector(j, i);

			var checkboxID = (i * rows) + j;

			if(curMap[j][i] == newMap[j][i])
			{
				if(fruitTestVec.x == fruitPosition.x && fruitTestVec.y == fruitPosition.y)
					checkboxes[checkboxID].class('fruitSpace');
			}
			else if(newMap[j][i] == false)
			{
				if(fruitTestVec.x == fruitPosition.x && fruitTestVec.y == fruitPosition.y)
				{
					checkboxes[checkboxID].class('fruitSpace');
				}
				else
				{
					checkboxes[checkboxID].class('snakeSpace');
				}
			}
			else
			{
				checkboxes[checkboxID].class('emptySpace');
			}
		}
	}

	curMap = newMap;
	newMap = [];
	initilizeMap(newMap, false);
}

function SnakeSegment(x, y, parent)
{
	this.x = x;
	this.y = y;
	this.parent = parent;

	this.move = function()
	{
		//If we're not the head, move to our parents positon
		if(parent != undefined)
		{
			this.x = parent.x;
			this.y = parent.y;
			newMap[this.x][this.y] = false;
		}
		//Else we're controlled by player input
		else
		{

			switch(chosenInput)
			{
				case UP_ARROW:
					this.y--;
					break;

				case DOWN_ARROW:
					this.y++;
					break;

				case RIGHT_ARROW:
					this.x++;
					break;

				case LEFT_ARROW:
					this.x--;
					break;

				default:
					this.x++;
			}

			if(this.x < 0 || this.y < 0 || this.x > (colms - 1) || this.y > (rows - 1))
			{
				die();
			}
			else if(newMap[this.x][this.y] == false)
			{
				die();
			}
			else
			{
				if(this.x == fruitPosition.x && this.y == fruitPosition.y)
				{
					extendSnake();
					adjustTickTimer();
					placeNewFruit();
				}
				
				newMap[this.x][this.y] = false;
			}
		}
	}
}