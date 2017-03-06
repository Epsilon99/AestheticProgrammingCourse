class Cell {
	constructor(curState, nextState, neighbourUp, neighbourDown, neighbourLeft, neighbourRight, neighbourUpperLeft, neighbourUpperRight, neighbourLowerLeft, neighbourLowerRight, indexX, indexY) {
		this.curState = curState;
		this.nextState = nextState;
		this.neighbourUp = neighbourUp;
		this.neighbourDown = neighbourDown;
		this.neighbourLeft = neighbourLeft;
		this.neighbourRight = neighbourRight;
		this.neighbourUpperLeft = neighbourUpperLeft;
		this.neighbourUpperRight = neighbourUpperRight;
		this.neighbourLowerLeft = neighbourLowerLeft;
		this.neighbourLowerRight = neighbourLowerRight;
		this.indexX = indexX;
		this.indexY = indexY;
	}
}

class Button{
	constructor(x,y,width,height,text){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;
	}
}

var buttonsEditor = [
	new Button(10, 640, 125, 50, "Play"),
	new Button(145, 640, 125, 50, "Clear")
];

var buttonsPlaying = [
	new Button(10, 640, 125, 50, "Pause")
];

var cells = [];

var gridCountX = 20;
var gridCountY = 20;
var gridSizeX = 800;
var gridSizeY = 600;

var isGameRunning = false;

var timeBetweenGen = 200;
var timer;

var rows;
var collums;

function setup() 
{
	createCanvas(801, 800);

	timer = Date.now()

	createCells();
	drawCurrentGeneration();
}

function draw() 
{
	GUI();

	if(isGameRunning == true && timer <= Date.now())
	{
		calculateNextGeneration();
		advanceGeneration();
		drawCurrentGeneration();

		timer = Date.now() + timeBetweenGen;
	}	
}

function createCells()
{
	rows = (gridSizeX) / gridCountX;
	collums = (gridSizeY) / gridCountY; 

	for(i = 0; i < collums; i++)
	{
		for(j = 0; j < rows; j++)
		{
			var tCell = new Cell(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			tCell.indexX = j;
			tCell.indexY = i;
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
				cells[i].neighbourLeft = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == iIndexY)
				cells[i].neighbourRight = cells[j];

			if(jIndexY == (iIndexY - 1) && jIndexX == iIndexX)
				cells[i].neighbourUp = cells[j];

			if(jIndexY == (iIndexY + 1) && jIndexX == iIndexX)
				cells[i].neighbourDown = cells[j];
			
			if(jIndexX == (iIndexX - 1) && jIndexY == (iIndexY - 1))
				cells[i].neighbourUpperLeft = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == (iIndexY - 1))
				cells[i].neighbourUpperRight = cells[j];

			if(jIndexX == (iIndexX - 1) && jIndexY == (iIndexY + 1))
				cells[i].neighbourLowerLeft = cells[j];

			if(jIndexX == (iIndexX + 1) && jIndexY == (iIndexY + 1))
				cells[i].neighbourLowerRight = cells[j];
		}
	}
}

function calculateNextGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		var populatedNeighbours = 0;

		//Count amount of populated neighbours
		if(cells[i].neighbourLeft != undefined && cells[i].neighbourLeft.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourRight != undefined && cells[i].neighbourRight.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourUp != undefined && cells[i].neighbourUp.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourDown != undefined && cells[i].neighbourDown.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourUpperLeft != undefined && cells[i].neighbourUpperLeft.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourUpperRight != undefined && cells[i].neighbourUpperRight.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourLowerLeft != undefined && cells[i].neighbourLowerLeft.curState == 1)
			populatedNeighbours++;

		if(cells[i].neighbourLowerRight != undefined && cells[i].neighbourLowerRight.curState == 1)
			populatedNeighbours++;


		//Apply the laws of Conway's Game of Life
		if(cells[i].curState == 1)
		{
			if(populatedNeighbours < 2 || populatedNeighbours > 3)
				cells[i].nextState = 0;

			if(populatedNeighbours == 2 || populatedNeighbours == 3)
				cells[i].nextState = 1;
		}
		else if(cells[i].curState == 0)
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
			fill(255);
			rect(cells[i].indexX * gridCountX, cells[i].indexY * gridCountY, gridCountY, gridCountX);
		}
	}
}

function wipeGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		cells[i].curState = 0;
		cells[i].nextState = 0;
	}
}

function wipeNextGeneration()
{
	var cellsLength = cells.length;

	for(var i = 0; i < cellsLength; i++)
	{
		cells[i].nextState = 0;
	}
}

function editorMode()
{
	var mouseInGrid = true;
	var mouseGridX = Math.ceil(mouseX / gridCountX) - 1;
	var mouseGridY = Math.ceil(mouseY / gridCountX) - 1;
	var cellIndex;

	if(mouseX == 0)
		mouseGridX = 0;
	if(mouseY == 0)
		mouseGridY = 0;

	if(mouseX > gridSizeX)
		mouseInGrid = false
	if(mouseY > gridSizeY)
		mouseInGrid = false;

	if(mouseInGrid == true)
	{
		cellIndex = (mouseGridY * (rows)) + mouseGridX;

		if(cells[cellIndex].curState == 0)
		{
			cells[cellIndex].curState = 1;
			fill(0);
			rect(cells[cellIndex].indexX * gridCountX, cells[cellIndex].indexY * gridCountY, gridCountY, gridCountX);
		}
		else if(cells[cellIndex].curState == 1)
		{
			cells[cellIndex].curState = 0;
			fill(255);
			rect(cells[cellIndex].indexX * gridCountX, cells[cellIndex].indexY * gridCountY, gridCountY, gridCountX);
		}
	}
}

function mouseClicked()
{
	if(isGameRunning == false)
	{
		editorMode();
		checkEditorButtons();
	}
	else
	{
		checkPlayingButtons();
	}

}

function GUI()
{
	if(isGameRunning == false)
	{
		var buttonsLength = buttonsEditor.length;

		for(var i = 0; i < buttonsLength; i++)
		{
			fill(200);
			rect(buttonsEditor[i].x, buttonsEditor[i].y, buttonsEditor[i].width, buttonsEditor[i].height);

			fill(0);
			textAlign(CENTER);
			textSize(20);
			text(buttonsEditor[i].text, buttonsEditor[i].x + (buttonsEditor[i].width * 0.5), buttonsEditor[i].y + (buttonsEditor[i].height * 0.5) + 5)
		}
	}
	else
	{
		var buttonsLength = buttonsPlaying.length;

		for(var i = 0; i < buttonsLength; i++)
		{
			fill(200);
			rect(buttonsPlaying[i].x, buttonsPlaying[i].y, buttonsPlaying[i].width, buttonsPlaying[i].height);

			fill(0);
			textAlign(CENTER);
			textSize(20);
			text(buttonsPlaying[i].text, buttonsPlaying[i].x + (buttonsPlaying[i].width * 0.5), buttonsPlaying[i].y + (buttonsPlaying[i].height * 0.5) + 5)
		}
	}
}

function checkEditorButtons()
{
	var buttonText;
	var buttonsLength = buttonsEditor.length;

	for(var i = 0; i < buttonsLength; i++)
	{
		if(mouseX > buttonsEditor[i].x && mouseX < (buttonsEditor[i].x + buttonsEditor[i].width))
		{
			if(mouseY > buttonsEditor[i].y && mouseY < (buttonsEditor[i].y + buttonsEditor[i].height))
			{
				buttonText = buttonsEditor[i].text;
				break;
			}
		}
	}

	if(buttonText != undefined)
	{
		switch(buttonText)
		{
			case "Play":
				isGameRunning = true;
				clear();
				break;

			case "Clear":
				wipeGeneration();
				drawCurrentGeneration();
				break;

			default:

		}
	}
}

function checkPlayingButtons()
{
	var buttonIndex;
	var buttonsLength = buttonsPlaying.length;

	for(var i = 0; i < buttonsLength; i++)
	{
		if(mouseX > buttonsPlaying[i].x && mouseX < (buttonsPlaying[i].x + buttonsPlaying[i].width))
		{
			if(mouseY > buttonsPlaying[i].y && mouseY < (buttonsPlaying[i].y + buttonsPlaying[i].height))
			{
				buttonText = buttonsPlaying[i].text;
			}
		}
	}

	if(buttonText != undefined)
	{
		switch(buttonText)
		{
			case "Pause":
				pause();
				break;
			
			default:
		}
	}
}

function pause()
{
	isGameRunning = false;
	wipeNextGeneration();
}