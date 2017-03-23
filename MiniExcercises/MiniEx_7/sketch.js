curMap = [];
newMap = [];

rows = 15;
colms = 15;

checkboxSize = 19;
mapOffsetX = 100;
mapOffsetY = 100;

function setup() {
	createCanvas(windowWidth,windowHeight);
	initilizeMap();
}

function draw() {

}

function mouseClicked()
{
	console.log(checkboxes[1].checked);
}

function initilizeMap()
{
	for(var i = 0; i < colms; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			curMap.push([i,j]);
			curMap[i][j] = true;

			tCheckbox = createCheckbox(' ', false);
			tCheckbox.position(mapOffsetX + (checkboxSize * i), mapOffsetY + (checkboxSize * j));
			tCheckbox.class('checkbox-grass');
		}
	}
}

function human(x,y)
{
	this.posX = x;
	this.posY = y;

	
}