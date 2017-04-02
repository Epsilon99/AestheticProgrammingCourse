var bird;
var pipes = [];

var powerUpCounter = 0;
var powerUpEvery = 5;

var areWePlaying = true;

function setup() {
	createCanvas(400,600);

	bird = new Bird();

	pipes.push(new Pipe());
	powerUpCounter++;
}

function draw() {

	if(areWePlaying)
	{
		background(0);

		updatePipes();
		updateBird();
		spawnPipes();
		
	}
}

function updateBird()
{
	bird.update();
	bird.show();
}

function updatePipes()
{
	for(var i = pipes.length - 1; i >= 0; i--)
	{
		pipes[i].show();
		pipes[i].update();

		if(pipes[i].hits(bird))
		{
			
		}

		if(pipes[i].offscreen())
			pipes.splice(i, 1);

	}
}

function spawnPipes()
{
	if(frameCount % 150 == 0)
	{
		powerUpCounter++;

		pipes.push(new Pipe());

		if(powerUpCounter >= powerUpEvery)
		{
			pipes[pipes.length - 1].powerUp = true;
			powerUpCounter = 0;
		}
	}
}

function keyPressed()
{
	if(keyCode == 32)
	{
		bird.up();
	}

	if(keyCode == 27) //Pause function, used for debugging.
	{
		areWePlaying = !areWePlaying;
	}
}