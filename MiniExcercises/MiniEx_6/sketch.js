class dungeonTile {
	constructor(type, x, y, spriteValue) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.spriteValue = spriteValue;
	}
}

var testSprite;

var tileSprites = [];
var dungeonTiles = [];

var curMap = [];
var newMap = [];

var rows = 32;
var cols = 32;
var cellSize = 32;

var chanceToStartAlive = 45;
var starvationLimit = 3;
var birthLimit = 4;
var mapTuningSteps = 4;
var tuningCounter = 0;
var waitBetween = 500;
var waitCounter = 0;

var mapDone = false;
var didWeConvert = false;

var imagebuildercounter = 0;

function preload()
{
	spriteHell();
}

function setup() {
	createCanvas((cols * cellSize) + 1, (rows * cellSize) + 1);
	initialiseMap();
	drawMap();

	waitCounter = Date.now() + waitBetween;
}

function draw() {
	
	if(!mapDone)
	{
		if(tuningCounter < mapTuningSteps)
		{
			if(Date.now() > waitCounter)
			{
				doMapSimulation();
				switchMap();
				drawMap();
				tuningCounter++;
				waitCounter = Date.now() + waitBetween;
			}
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
			tileAllSprites();
			drawTiledMap();
			didWeConvert = true;
		}
		else
		{
			if(imagebuildercounter < dungeonTiles.length)
			{
				drawTiledMap();
				imagebuildercounter++;
			}
		}
	}
}

// restart
function keyPressed()
{
	dungeonTiles = [];
	curMap = [];
	newMap = [];
	tuningCounter = 0;
	mapDone = false;
	didWeConvert = false;
	waitCounter = Date.now() + waitBetween;
	imagebuildercounter = 0;

	initialiseMap();
	drawMap();
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
			{
				tTile.type = "Wall";
			}

			dungeonTiles.push(tTile);
		}
	}
}

function calculateTileSprite(map, x, y)
{
	var spriteValue = 0;
	var counter = 1;
	var values = [];

	for(var i = -1; i < 2; i++)
	{
		for(var j = -1; j < 2; j++)
		{
			var neighbourX = x + j;
			var neighbourY = y + i;

			if(i == 0 && j == 0)
			{
				//don't do anything
			}
			else if(neighbourX < 0 || neighbourY < 0 || neighbourX > rows || neighbourY > cols)
			{
				values.push(0);
				counter = counter * 2;
			}
			else if(map[neighbourX][neighbourY] == true)
			{
				values.push(counter);
				counter = counter * 2;
			}
			else
			{
				values.push(0);
				counter = counter * 2;
			}
		}
	}

	if(values[1] == 0 || values[3] == 0)
		values[0] = 0;

	if(values[1] == 0 || values[4] == 0)
		values[2] = 0;

	if(values[3] == 0 || values[6] == 0)
		values[5] = 0;

	if(values[4] == 0 || values[6] == 0)
		values[7] = 0;
	

	for(var i = 0; i < values.length; i++)
		spriteValue += values[i];

	return(spriteValue);
}

function tileAllSprites()
{
	var len = dungeonTiles.length;
	
	for(i = 0; i < len; i++)
	{
		if(dungeonTiles[i].type == "Floor")
		{
			dungeonTiles[i].spriteValue = calculateTileSprite(curMap, dungeonTiles[i].x, dungeonTiles[i].y);		
		}

		if(dungeonTiles[i].type == "Wall")
		{
			dungeonTiles[i].spriteValue = 256;
		}
	}
}

function drawTiledMap()
{
	var tSpriteValue = dungeonTiles[imagebuildercounter].spriteValue;

	image(tileSprites[tSpriteValue], dungeonTiles[imagebuildercounter].x * cellSize, dungeonTiles[imagebuildercounter].y * cellSize);
}


// I should really have used a JSON, sprite splicer or spritesheet instead....
function spriteHell() {
	tileSprites[0] = loadImage("sprites/sprite_0.jpg");
	tileSprites[2] = loadImage("sprites/sprite_2.jpg");
	tileSprites[8] = loadImage("sprites/sprite_8.jpg");
	tileSprites[10] = loadImage("sprites/sprite_10.jpg");
	tileSprites[11] = loadImage("sprites/sprite_11.jpg");
	tileSprites[16] = loadImage("sprites/sprite_16.jpg");
	tileSprites[18] = loadImage("sprites/sprite_18.jpg");
	tileSprites[22] = loadImage("sprites/sprite_22.jpg");
	tileSprites[24] = loadImage("sprites/sprite_24.jpg");
	tileSprites[26] = loadImage("sprites/sprite_26.jpg");
	tileSprites[27] = loadImage("sprites/sprite_27.jpg");
	tileSprites[30] = loadImage("sprites/sprite_30.jpg");
	tileSprites[31] = loadImage("sprites/sprite_31.jpg");
	tileSprites[64] = loadImage("sprites/sprite_64.jpg");
	tileSprites[66] = loadImage("sprites/sprite_66.jpg");
	tileSprites[72] = loadImage("sprites/sprite_72.jpg");
	tileSprites[74] = loadImage("sprites/sprite_74.jpg");
	tileSprites[75] = loadImage("sprites/sprite_75.jpg");
	tileSprites[80] = loadImage("sprites/sprite_80.jpg");
	tileSprites[82] = loadImage("sprites/sprite_82.jpg");
	tileSprites[86] = loadImage("sprites/sprite_86.jpg");
	tileSprites[88] = loadImage("sprites/sprite_88.jpg");
	tileSprites[90] = loadImage("sprites/sprite_90.jpg");
	tileSprites[91] = loadImage("sprites/sprite_91.jpg");
	tileSprites[94] = loadImage("sprites/sprite_94.jpg");
	tileSprites[95] = loadImage("sprites/sprite_95.jpg");
	tileSprites[104] = loadImage("sprites/sprite_104.jpg");
	tileSprites[106] = loadImage("sprites/sprite_106.jpg");
	tileSprites[107] = loadImage("sprites/sprite_107.jpg");
	tileSprites[120] = loadImage("sprites/sprite_120.jpg");
	tileSprites[122] = loadImage("sprites/sprite_122.jpg");
	tileSprites[123] = loadImage("sprites/sprite_123.jpg");
	tileSprites[126] = loadImage("sprites/sprite_126.jpg");
	tileSprites[127] = loadImage("sprites/sprite_127.jpg");
	tileSprites[208] = loadImage("sprites/sprite_208.jpg");
	tileSprites[210] = loadImage("sprites/sprite_210.jpg");
	tileSprites[214] = loadImage("sprites/sprite_214.jpg");
	tileSprites[216] = loadImage("sprites/sprite_216.jpg");
	tileSprites[218] = loadImage("sprites/sprite_218.jpg");
	tileSprites[219] = loadImage("sprites/sprite_219.jpg");
	tileSprites[222] = loadImage("sprites/sprite_222.jpg");
	tileSprites[223] = loadImage("sprites/sprite_223.jpg");
	tileSprites[248] = loadImage("sprites/sprite_248.jpg");
	tileSprites[250] = loadImage("sprites/sprite_250.jpg");
	tileSprites[251] = loadImage("sprites/sprite_251.jpg");
	tileSprites[254] = loadImage("sprites/sprite_254.jpg");
	tileSprites[255] = loadImage("sprites/sprite_255.jpg");
	tileSprites[256] = loadImage("sprites/sprite_256.jpg");
}