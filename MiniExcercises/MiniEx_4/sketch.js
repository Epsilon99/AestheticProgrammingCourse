class Cell {
	constructor(curState, nextState, neighbourUp ,neighbourDown ,neighbourLeft ,neighbourRight ,indexX , indexY) {
		this.curState = curState;
		this.nextState = nextState;
		this.neighbourUp = neighbourUp;
		this.neighbourDown = neighbourDown;
		this.neighbourLeft = neighbourLeft;
		this.neighbourRight = neighbourRight;
		this.indexX = indexX;
		this.indexY = indexY;
	}
}

var cells = [];

var gridCountX = 100;
var gridCountY = 100;

function setup() 
{
	createCanvas(601,601);
	createCells();
}

function draw() 
{
	calculateNextGeneration();
	drawCurrentGeneration();
}

function createCells()
{
	var rows = (width - 1) / gridCountX;
	var collums = (height - 1) / gridCountY; 

	for(i = 0; i < collums; i++)
	{
		for(j = 0; j < rows; j++)
		{
			var tCell = new Cell();
			tCell.indexX = j;
			tCell.indexY = i;
			cells.push(tCell);
		}
	}

	var cellsLength = cells.length;

	console.log(cellsLength);

	for(i = 0; i < cellsLength; i++)
	{
		var iIndexX = cells[i].indexX;
		var iIndexY = cells[i].indexY;

		for(j = 0; j < cellsLength; j++)
		{
			var jIndexX = cells[j].indexX;
			var jIndexY = cells[j].indexY;

			if(jIndexX == (iIndexX - 1) && jIndexY == iIndexY)
				cells[i].neighbourLeft = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == iIndexY)
				cells[i].neighbourRight = cells[j];

			if(jIndexY == (iIndexY - 1) && jIndexX == iIndexX)
				cells[i].neighbourUp = cells[j];

			if(jIndexY == (iIndexY + 1) && jIndexX == iIndexX)
				cells[i].neighbourDown = cells[j];
			
		}
	}
}

function calculateNextGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		var populatedNeighbours = 0;

		if(cells[i].neighbourLeft != undefined && cells[i].neighbourLeft.curState === 1)
			populatedNeighbours++;

		if(cells[i].neighbourRight != undefined && cells[i].neighbourRight.curState === 1)
			populatedNeighbours++;

		if(cells[i].neighbourUp != undefined && cells[i].neighbourUp.curState === 1)
			populatedNeighbours++;

		if(cells[i].neighbourDown != undefined && cells[i].neighbourDown.curState === 1)
			populatedNeighbours++;

		if(curState == 1)
		{
			if(populatedNeighbours < 2 || populatedNeighbours > 3)
				cells[i].nextState = 0;

			if(populatedNeighbours == 2 || populatedNeighbours == 3)
				cells[i].nextState = 1;
		}
		else if(curState == 0)
		{
			if(populatedNeighbours == 3)
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

function drawCurrentGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		if(cells[i].curState == 1)
		{
			fill(0);
			rect(cells[i].indexX * gridCountX, cells[i].indexY * gridCountY, gridCountY, gridCountX);
		}
		else if(cells[i].curState == 0)
		{
			noFill();
			rect(cells[i].indexX * gridCountX, cells[i].indexY * gridCountY, gridCountY, gridCountX);
		}
	}
}

function mouseClicked()
{
	
}


/* Draw grid: 
for(i = 0; i < cells.length; i++)
	{
		rect(cells[i].indexX * gridCountX, cells[i].indexY * gridCountY, gridCountX, gridCountY);
	}
*/