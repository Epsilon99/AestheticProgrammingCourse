class MovingObject {
	constructor(curX, curY, movementSpeed, dirX, dirY) {
    	this.curX = curX;
		this.curY = curY;
		this.movementSpeed = movementSpeed;
		this.dirX = dirX;
		this.dirY = dirY;
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
var Enemy = new MovingObject(0, 0, 0, 0, 0);

var bulletSpeed = 1;
var bullet = new MovingObject(0, 0, 0, 0, 0);

var enemies = [];
var bullets = [];
var throbberCircles = [];

function setup() 
{
	createCanvas(800,600);
	var bulletClone = new MovingObject(width * 0.5, height * 0.5, bulletSpeed, 1, 0);
	bullets.push(bulletClone);
}

function draw() 
{
	clear();
	updateBullets();
}

function idleThrobber()
{

}

function throbberAim()
{

}

function updateBullets()
{
	var bulletsLength = bullets.length;
	console.log(bulletsLength);

	for(i = 0; i < bulletsLength; i++)
	{
		var newPosX = bullets[i].curX + (bullets[i].dirX * bulletSpeed);
		var newPosY = bullets[i].curY + (bullets[i].dirY * bulletSpeed);
		bullets[i].curX = newPosX;
		bullets[i].curY = newPosY;

		fill(0);
		noStroke();
		ellipse(newPosX,newPosY,5);
	}
}

function UpdateEnemies()
{

}