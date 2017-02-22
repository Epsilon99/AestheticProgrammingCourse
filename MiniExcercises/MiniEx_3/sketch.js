class MovingObjects {
	constructor(curX, curY, movement speed, dirX, dirY, tag) {
		this.curX = curX;
		this.curY = curY;
		this.speed = speed;
		this.dirX = dirX;
		this.dirY = dirY;
		this.tag = tag;
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
var Enemy = new MovingObjects() {0, 0, 0, 0, 0, "Enemy"};

var bulletSpeed = 1;
var bullet = new MovingObjects() {0, 0, 0, 0, 0, "Bullet"};

var enemies;
var bullets;
var throbberCircles;

function setup() 
{
	createCanvas(800,600);
	//var bulletClone = new bullet {width * 0.5, height * 0.5, bulletSpeed, 1, 0, "Bullet"};
	//bullets[].pop(bulletClone);
}

function draw() 
{
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
	var bulletsLength = bullets[].length;
	for(i = 0; i < bulletsLength; i++)
	{
		var newPosX = bullets[i].curX + (bullets[i].dirX * bulletSpeed);
		var newPosY = bullets[i].curY + (bullets[i].dirY * bulletSpeed);
		bullets[i].curX = newPosX;
		bullets[i].curY = newPosY;

		fill(150);
		noStroke();
		ellipse(newPosX,newPosY,5);
	}
}

function UpdateEnemies()
{

}