class dungeonTile {
	constructor(type, x, y, sprite) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.sprite = sprite;
	}
}

var curMap = [];
var newMap = [];

var dungeonTiles = [];

var rows = 64;
var cols = 64;
var cellSize = 16;

var chanceToStartAlive = 50;
var starvationLimit = 3;
var birthLimit = 4;
var mapTuningSteps = 4;
var tuningCounter = 0;

var mapDone = false;
var didWeConvert = false;

var debugCounter = 0;

function setup() {
	createCanvas((cols * cellSize) + 1, (rows * cellSize) + 1);
	initialiseMap();
	drawMap();
}

function draw() {
	
	if(!mapDone)
	{
		if(tuningCounter < mapTuningSteps)
		{
			doMapSimulation();
			switchMap();
			drawMap();
			tuningCounter++;
		}
		else
		{
			mapDone = true;
		}
	}
	else
	{
		if(!didWeConvert)
		{
			convertMapToTiles(curMap);
			didWeConvert = true;
		}
	}
}

function mouseClicked()
{
	console.log(dungeonTiles[debugCounter]);
	debugCounter++;
}

function initialiseMap()
{
	for(i = 0; i < cols; i++)
	{
		for(j = 0; j < rows; j++)
		{
			curMap.push([i,j]);

			if(random(0,100) <= chanceToStartAlive)
				curMap[i][j] = true;
			else
				curMap[i][j] = false;
		}
	}
}

function countAliveNeighbours(map, x, y)
{
	var neighbourCount = 0;

	for(var i = -1; i < 2; i++)
	{
		for(var j = -1; j < 2; j++)
		{
			var neighbourX = x + i;
			var neighbourY = y + j;

			if(i == 0 && j == 0)
			{
				//don't do anything
			}
			else if(neighbourX < 0 || neighbourY < 0 || neighbourX > rows || neighbourY > cols)
			{
				//neighbourCount++;
			}
			else if(map[neighbourX][neighbourY] == true)
			{
				neighbourCount++;
			}
		}
	}

	return neighbourCount;
}

function doMapSimulation()
{
	for(var i = 0; i < cols; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			var neighbourCount = countAliveNeighbours(curMap, i, j);
			newMap.push([i,j]);

			if(curMap[i][j])
			{
				if(neighbourCount < starvationLimit)
					newMap[i][j] = false;
				else
					newMap[i][j] = true;
			}
			else
			{
				if(neighbourCount > birthLimit)
					newMap[i][j] = true;
				else
					newMap[i][j] = false;
			}
		}
	}
}

function switchMap()
{
	curMap = newMap;
	newMap = [];
}

function convertMapToTiles(map)
{
	for(var i = 0; i < cols; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			var tTile = new dungeonTile(0,j,i,0); //fucked up with collums and rows, so now I flip them, to get the array sorted from left to right.

			if(map[j][i])
				tTile.type = "Floor";
			else
				tTile.type = "Wall";

			dungeonTiles.push(tTile);
		}
	}
}

function drawMap()
{
	for(i = 0; i < cols; i++)
	{
		for(j = 0; j < rows; j++)
		{
			if(curMap[i][j])
				fill(44, 46, 255);
			else
				fill(0);

			rect(i * cellSize, j * cellSize, cellSize, cellSize);
		}
	}
}