var myFont;

var words = [
	"you are my snarklebork",
	"my pretty snircherflitch",
	"and when i see your face",
	"my butthole starts to itch",
	"i want to lick your eyes",
	"and in the pouring rain",
	"you are my hairy wart",
	"you are my herbal stain"
];

function preload() {
	myFont = loadFont("data/GoodDog.otf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	textFont(myFont);
	noStroke();
}

function draw() {
	clear();
	createCanvas(windowWidth, windowHeight);
	background(0);
	writeText();
}

function writeText()
{
	var curTextSize = windowHeight / 10;

	for(var i = 0; i < words.length; i++)
	{
		fill(255);
		textAlign(CENTER);
		textSize(curTextSize);
		text(words[i], width * 0.5, curTextSize + (curTextSize * i) + (curTextSize) * 0.5);
	}
}