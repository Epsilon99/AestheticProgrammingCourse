class Vector2D {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
}

class MovingObject {
	constructor(curX, curY, movementSpeed, dir) {
    	this.curX = curX;
		this.curY = curY;
		this.movementSpeed = movementSpeed;
		this.dir = dir;
	}
}

class ThrobberCircle {
	constructor(x, y, width, color, curAlpha) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.color = color;
		this.curAlpha = curAlpha;
	}
}

var enemySpeed = 5;
var enemies = [];

var bulletSpeed = 6;
var bullets = [];
var cooldown = 500;
var cooldownTimer;

var throbberCircles = [];
var throbberRadius = 35;

var middleVector;

var areWeIdle = true;

function setup() 
{
	createCanvas(800,600);
	middleVector = new Vector2D(width * 0.5, height * 0.5);
	cooldownTimer = Date.now();
}

function draw() 
{
	clear();
	background(0);
	gameInput();
	updateBullets();
}

function idleThrobber()
{

}

function gameInput()
{
	throbberAim();

	if(mouseIsPressed && cooldownTimer <= Date.now())
	{
		fireBullet();
	}
}

function fireBullet()
{
	var firingDir = new Vector2D(mouseX - middleVector.x, mouseY - middleVector.y);
	firingDir = vectorNormalize(firingDir);

	var bulletClone = new MovingObject(middleVector.x + (throbberRadius * firingDir.x),middleVector.y + (throbberRadius * firingDir.y), bulletSpeed, firingDir);

	bullets.push(bulletClone);

	cooldownTimer = Date.now() + cooldown;
}

function throbberAim()
{
	var direction = new Vector2D(mouseX - middleVector.x, mouseY - middleVector.y);
	direction = vectorNormalize(direction);

	fill(220);
	noStroke();
	ellipse(middleVector.x + (throbberRadius * direction.x),middleVector.y + (throbberRadius * direction.y),20);
}

function updateBullets()
{
	var bulletsLength = bullets.length;
	var bulletesToDelte = [];

	for(i = 0; i < bulletsLength; i++)
	{
		var newPosX = bullets[i].curX + (bullets[i].dir.x * bulletSpeed);
		var newPosY = bullets[i].curY + (bullets[i].dir.y * bulletSpeed);
		bullets[i].curX = newPosX;
		bullets[i].curY = newPosY;

		var deleteFlag = false;

		if(newPosX > width || newPosX < 0)
			deleteFlag = true;
		else if(newPosY > height || newPosY < 0)
			deleteFlag = true;

		

		if(deleteFlag == false)
		{
			fill(0,255,86);
			noStroke();
			ellipse(newPosX,newPosY,5);
		}
		else
		{
			bulletesToDelte.push(i);
		}
	}

	var deleteListLengeth = bulletesToDelte.length;

	for(i = 0; i < deleteListLengeth; i++)
	{
		bullets.splice(bulletesToDelte[i], 1);
	}
}

function updateEnemies()
{
	var enemiesLength = enemies.length;

	for(i = 0; i < bulletsLength; i++)
	{
		var newPosX = enemies[i].curX + (enemies[i].dir.x * enemySpeed);
		var newPosY = enemies[i].curY + (enemies[i].dir.y * enemySpeed);
		enemies[i].curX = newPosX;
		enemies[i].curY = newPosY;

		fill(0);
		noStroke();
		ellipse(newPosX,newPosY,5);
	}
}

function vectorMagnitude(thisVector)
{
	var magnitude = Math.sqrt((thisVector.x * thisVector.x)+(thisVector.y * thisVector.y));
	
	return magnitude;
}

function vectorNormalize(thisVector)
{
	var magnitude = vectorMagnitude(thisVector);
	var normalizedVector = new Vector2D(thisVector.x / magnitude, thisVector.y / magnitude);

	return normalizedVector;
}

/*
	var bulletClone = new MovingObject(width * 0.5, height * 0.5, bulletSpeed, 0);
	var tDir = new Vector2D(20,4);
	tDir = normalizeVector(tDir);
	bulletClone.dir = tDir;
	bullets.push(bulletClone);
*/