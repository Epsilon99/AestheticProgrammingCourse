var curMonth;
var curDay;
var curHour;
var curMin;
var curSec;

var curSkinColor;
var shirtFlag;
var curShirtColor;

var left_StartX = 208;
var left_StartY = 358;
var left_ElbowX;
var left_ElbowY;
var left_HandX;
var left_HandY;
var right_StartX = 391;
var right_StartY = 358;	
var right_ElbowX;
var right_ElbowY;
var right_HandX;
var right_HandY;

var img_Logo0;
var img_Logo1;
var img_Logo2;
var img_Logo3;
var img_Logo4;
var img_Logo5;
var img_Logo6;
var img_Logo7;
var img_Logo8;
var img_Logo9;
var curLogo;

function preload(){
	img_Logo0 = loadImage("assets/logo0.png");
	img_Logo1 = loadImage("assets/logo1.png");
	img_Logo2 = loadImage("assets/logo2.png");
	img_Logo3 = loadImage("assets/logo3.png");
	img_Logo4 = loadImage("assets/logo4.png");
	img_Logo5 = loadImage("assets/logo5.png");
	img_Logo6 = loadImage("assets/logo6.png");
	img_Logo7 = loadImage("assets/logo7.png");
	img_Logo8 = loadImage("assets/logo8.png");
	img_Logo9 = loadImage("assets/logo9.png");	
}

function setup() {
	createCanvas(600,600);
	getDate();

	curSkinColor = RandomColor(curMonth);
	curShirtColor = RandomColor(curDay);
	ChooseArmPosition();

	setInterval(ChooseSkinColor, 200);
	setInterval(ChooseArmPosition, 90);
}

function draw() {
	clear();
	
	getDate();

	DrawHead();
	DrawEyes();
	DrawPupils();
	DrawBody();
	DrawArms();
}

function getDate()
{
	var d = new Date();

	curMonth = d.getMonth();
	curDay = d.getDay();
	curHour = d.getHours();
	curMin = d.getMinutes();
	curSec = d.getSeconds();
}

function DrawHead()
{
	fill(curSkinColor);
	noStroke();
	ellipse(300, 200, 300, 220);
	ellipse(153, 191, 50);
	ellipse(445, 191, 50);
	rect(290 ,300 , 20 , 25);
}

function DrawEyes()
{
	fill(255);
	noStroke();
	ellipse(235,200,50,40);
	ellipse(365,200,50,40);
}

function DrawPupils()
{
	fill(0);
	noStroke();
	ellipse(235,200,10 * cos(curSec));
	ellipse(365,200,10 * cos(-curSec / 2));
}

function DrawBody()
{
	ChooseShirt();

	fill(curShirtColor);
	noStroke();
	beginShape();
	vertex(201, 325);
	vertex(401, 325);
	vertex(351, 525);
	vertex(251, 525);
	endShape(CLOSE); 

	image(curLogo,261,350);
}

function DrawArms()
{
	stroke(curSkinColor);
	strokeWeight(8);
	line(left_StartX, left_StartY, left_ElbowX, left_ElbowY);
	line(left_ElbowX, left_ElbowY, left_HandX, left_HandY);
	line(right_StartX, right_StartY, right_ElbowX, right_ElbowY);
	line(right_ElbowX, right_ElbowY, right_HandX, right_HandY);
}

function ChooseArmPosition()
{
	left_ElbowX = left_StartX + RandomArmLength(curMin);
	left_ElbowY = left_StartY + RandomArmLength(curSec);
	left_HandX = left_ElbowX + RandomArmLength(curSec);
	left_HandY = left_StartY + RandomArmLength(curMin);

	right_ElbowX = right_StartX + RandomArmLength(curMin);
	right_ElbowY = right_StartY + RandomArmLength(curSec);
	right_HandX = right_ElbowX + RandomArmLength(curSec);
	right_HandY = right_StartY + RandomArmLength(curMin);
}

function ChooseSkinColor()
{
	curSkinColor = RandomColor(curMin);
}

function ChooseShirt()
{
	switch(Math.floor(curMin / 10))
	{
		case 0:
			if(shirtFlag != 0)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo0;
			shirtFlag = 0;
			break;

		case 1:
			if(shirtFlag != 1)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo1;
			shirtFlag = 1;
			break;

		case 2:
			if(shirtFlag != 2)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo2;
			shirtFlag = 2;
			break;
		
		case 3:
			if(shirtFlag != 3)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo3;
			shirtFlag = 3;
			break;

		case 4:
			if(shirtFlag != 4)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo4;
			shirtFlag = 4;
			break;

		case 5:
			if(shirtFlag != 5)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo5;
			shirtFlag = 5;
			break;

		case 6:
			if(shirtFlag != 6)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo6;
			shirtFlag = 6;
			break;

		case 7:
			if(shirtFlag != 7)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo7;
			shirtFlag = 7;
			break;

		case 8:
			if(shirtFlag != 8)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo8;
			shirtFlag = 8;
			break;

		case 9:
			if(shirtFlag != 9)
				curShirtColor = RandomColor(curMonth);
			curLogo = img_Logo9;
			shirtFlag = 9;
			break;
		default:
			curLogo = img_Logo0;
			shirtFlag = 0;
	}
}

function RandomColor(tSeed)
{
	var tR = Math.floor(Math.random(tSeed) * (255 - 1 + 1)) + 1;
	var tG = Math.floor(Math.random(tSeed) * (255 - 1 + 1)) + 1;
	var tB = Math.floor(Math.random(tSeed) * (255 - 1 + 1)) + 1;

	return color(tR,tG,tB);
}

function RandomArmLength(tSeed)
{
	return Math.floor(Math.random() * (80 - (-80) + 1)) + (-80);
}
