class Cell {
	constructor(curState, nextState, N, S, W, E, NW, NE, SW, SE, indexX, indexY, sprite) {
		this.curState = curState;
		this.nextState = nextState;
		this.N = N;
		this.S = S;
		this.W = W;
		this.E = E;
		this.NW = NW;
		this.NE = NE;
		this.SW = SW;
		this.SE = SE;
		this.indexX = indexX;
		this.indexY = indexY;
		this.sprite = sprite;
	}
}

var cells = [];

var chanceToStartAlive = 50;
var starvationLimit = 3;
var overpopLimit = 6;
var birthLimit = 4;
var numberOfSteps = 4;
var numberCounter = 0;

var cellCount;
var cellSize = 16;

var gridSizeX = 1024;
var gridSizeY = 1024;

function setup() {
	createCanvas(gridSizeX + 1,gridSizeY + 1);
	cellCount = gridSizeX / cellSize;

	createNewMap();
	drawMap(false, true);
	
}

function draw() {
	drawMap(false, true);

	if(numberCounter < numberOfSteps)
	{
		evaluateGeneration();
		advanceGeneration();
		numberCounter++;
	}
}

function mouseClicked()
{
	
}

function createNewMap()
{
	rows = cellCount;
	collums = cellCount; 

	for(i = 0; i < collums; i++)
	{
		for(j = 0; j < rows; j++)
		{
			var tCell = new Cell(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			tCell.indexX = j;
			tCell.indexY = i;

			if(random(0,100) <= chanceToStartAlive)
				tCell.curState = 1;

			cells.push(tCell);
		}
	}

	var cellsLength = cells.length;

	for(i = 0; i < cellsLength; i++)
	{
		var iIndexX = cells[i].indexX;
		var iIndexY = cells[i].indexY;

		for(j = 0; j < cellsLength; j++)
		{
			var jIndexX = cells[j].indexX;
			var jIndexY = cells[j].indexY;

			//Create link between a cell and its neighbours
			if(jIndexX == (iIndexX - 1) && jIndexY == iIndexY)
				cells[i].W = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == iIndexY)
				cells[i].E = cells[j];

			if(jIndexY == (iIndexY - 1) && jIndexX == iIndexX)
				cells[i].N = cells[j];

			if(jIndexY == (iIndexY + 1) && jIndexX == iIndexX)
				cells[i].S = cells[j];
			
			if(jIndexX == (iIndexX - 1) && jIndexY == (iIndexY - 1))
				cells[i].NW = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == (iIndexY - 1))
				cells[i].NE = cells[j];

			if(jIndexX == (iIndexX - 1) && jIndexY == (iIndexY + 1))
				cells[i].SW = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == (iIndexY + 1))
				cells[i].SE = cells[j];
		}
	}
}

function evaluateGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		var populatedNeighbours = 0;

		//Count amount of populated neighbours
		if(cells[i].W != undefined && cells[i].W.curState == 1)
			populatedNeighbours++;

		if(cells[i].E != undefined && cells[i].E.curState == 1)
			populatedNeighbours++;

		if(cells[i].N != undefined && cells[i].N.curState == 1)
			populatedNeighbours++;

		if(cells[i].S != undefined && cells[i].S.curState == 1)
			populatedNeighbours++;
		else if(cells[i].S == undefined)
			populatedNeighbours++;

		if(cells[i].NW != undefined && cells[i].NW.curState == 1)
			populatedNeighbours++;

		if(cells[i].NE != undefined && cells[i].NE.curState == 1)
			populatedNeighbours++;

		if(cells[i].SW != undefined && cells[i].SW.curState == 1)
			populatedNeighbours++;

		if(cells[i].SE != undefined && cells[i].SE.curState == 1)
			populatedNeighbours++;
		

		//Apply the laws of Conway's Game of Life
		if(cells[i].curState == 1)
		{
			if(populatedNeighbours < starvationLimit)
			{
				cells[i].nextState = 0;
			}
			else
				cells[i].nextState = 1;
		}
		else if(cells[i].curState == 0)
		{
			if(populatedNeighbours > birthLimit)
				cells[i].nextState = 1;
		}
	}
}

function advanceGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		cells[i].curState = cells[i].nextState;
	}
}

function drawMap(withSprites, current)
{
	if(withSprites == false)
	{
		var cellsLength = cells.length;

		for(var i = 0; i < cellsLength; i++)
		{
			if(current == true)
			{
				if(cells[i].curState == 1)
				{
					fill(44, 46, 255);
					rect(cells[i].indexX * cellSize, cells[i].indexY * cellSize, cellSize, cellSize);
				}
				else if(cells[i].curState == 0)
				{
					fill(0);
					rect(cells[i].indexX * cellSize, cells[i].indexY * cellSize, cellSize, cellSize);
				}
			}
			else
			{
				if(cells[i].nextState == 1)
				{
					fill(44, 46, 255);
					rect(cells[i].indexX * cellSize, cells[i].indexY * cellSize, cellSize, cellSize);
				}
					else if(cells[i].nextState == 0)
				{
					fill(0);
					rect(cells[i].indexX * cellSize, cells[i].indexY * cellSize, cellSize, cellSize);
				}
			}
		}
	}
	else
	{
		// Do sprite here
	}
}