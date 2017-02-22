class UIButton {
  constructor(x, y, height, width, text) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.text = text;
  }
}

var buttonStandardWidth = 200;
var buttonStandardHeight = 50;
var buttonsStartOffsetY = 200;
var buttonsStartOffsetX;
var buttonSpacingY = 20;

var playButton = new UIButton(0,0,buttonStandardHeight,buttonStandardWidth,"Play Game");
var armoryButton = new UIButton(0,0,buttonStandardHeight,buttonStandardWidth,"Armory");
var options = new UIButton(0,0,buttonStandardHeight,buttonStandardWidth,"Options");
var exitButton = new UIButton(0,0,buttonStandardHeight,buttonStandardWidth,"Exit");

var menuButtons = [playButton, armoryButton, options, exitButton];

function setup() {
	createCanvas(800,600);
	buttonsStartOffsetX = (width * 0.5) - (buttonStandardWidth * 0.5);
}

function draw() {
	Menu();

	stroke(0);
	line(400,0,400,600);
}

function Menu()
{
	var curLength = menuButtons.length;

	for (var i = 0; i < menuButtons.length; i++) {
		var mY = buttonsStartOffsetY + ((i + 1) * buttonStandardHeight) + ((i + 1) * buttonSpacingY);

		rect(buttonsStartOffsetX,mY,buttonStandardWidth,buttonStandardHeight);

		textSize(32);
		text(menuButtons[i].text, (width * 0.5), mY + (buttonStandardHeight * 0.5));
	}
}