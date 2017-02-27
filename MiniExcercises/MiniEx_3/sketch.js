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

var enemySpeed = 3;
var enemies = [];
var enemyWidth = 20;

var bulletSpeed = 6;
var bulletSize = 5;
var bullets = [];
var cooldown = 300;
var cooldownTimer;

var spawnCooldown = 1000;
var spawnTimer;

var throbberRadius = 45;
var homeThrobberRadius = 35;

var middleVector;

var score = 0;
var life = 5;

var areWeIdle = true;
var didWeDie = false;

function setup() 
{
	createCanvas(800,600);
	middleVector = new Vector2D(width * 0.5, height * 0.5);
	cooldownTimer = Date.now();
	spawnTimer = Date.now();

	frameRate(15);
	background(0);
}

function draw() 
{
	console.log(areWeIdle);

	if(areWeIdle == true)
	{		
		fill(10,80);
		rect(0, 0, width, height);
		idleThrobber(11);

		fill(255);
		textSize(32);
		textAlign(CENTER);
		text("Click to play",middleVector.x,height - 200);
	}
	
	if(areWeIdle == false)
	{
		if(didWeDie == false)
		{
			clear();
			background(0);
			gameHandler();
			gameInput();
		}
		else
		{
			fill(10,80);
			rect(0, 0, width, height);
			idleThrobber(11);

			fill(255);
			textSize(32);
			textAlign(CENTER);
			text("Game Over",middleVector.x, 200);
			text("Click to play again", middleVector.x,height - 200);
			textSize(28);
			text("Your score: " + score, middleVector.x,230);
		}
	}
}

function mouseClicked()
{
	if(areWeIdle == true)
	{
		frameRate (60);
		areWeIdle = false;
		console.log(areWeIdle);
	}

	if(areWeIdle == false && didWeDie == true)
	{
		resetGame();
		frameRate(60);
	}
}

function idleThrobber(num)
{
	push();
  	translate(width/2, height/2);
	var cir = 360/num*(frameCount%num);
	rotate(radians(cir));
	noStroke();
	fill(220); 
	ellipse(throbberRadius,0,20);
	pop();
}

function gameHandler()
{
	updateBulletsPosition();
	updateEnemies();
	bulletHitDetection();
	enemyHitDetection();

	if(spawnTimer <= Date.now())
	{
		spawnEnemy();
		spawnTimer = Date.now() + spawnCooldown;
	}

	lifeIndicator();
	scoreGUI();
}

function resetGame()
{
	score = 0;
	life = 5;
	didWeDie = false;
	bullets = [];
	enemies = [];
}

function gameInput()
{
	throbberAim();

	if(mouseIsPressed && cooldownTimer <= Date.now())
	{
		fireBullet();
	}
}

function scoreGUI()
{
	fill(255);
	textSize(32);
	text("Score: " + score,middleVector.x,40);
}

function lifeIndicator()
{
	fill(220);
	ellipse(middleVector.x,middleVector.y,homeThrobberRadius);

	fill(20);
	textSize(16);
	textAlign(CENTER);
	text("" + life,middleVector.x,middleVector.y + 8);
}


function updateLife(amount)
{
	life = life + amount;

	if(life <= 0)
	{
		didWeDie = true;
		frameRate(15);
	}
}

function throbberAim()
{
	var direction = new Vector2D(mouseX - middleVector.x, mouseY - middleVector.y);
	direction = vectorNormalize(direction);

	fill(220);
	noStroke();
	ellipse(middleVector.x + (throbberRadius * direction.x),middleVector.y + (throbberRadius * direction.y),20);
}

function fireBullet()
{
	var firingDir = new Vector2D(mouseX - middleVector.x, mouseY - middleVector.y);
	firingDir = vectorNormalize(firingDir);

	var bulletClone = new MovingObject(middleVector.x + (throbberRadius * firingDir.x),middleVector.y + (throbberRadius * firingDir.y), bulletSpeed, firingDir);

	bullets.push(bulletClone);

	cooldownTimer = Date.now() + cooldown;
}

function spawnEnemy()
{
	 var border = Math.floor(Math.random()*(4)+1) - 1;
	 var spawnPos = new Vector2D(0,0);
	 
	 switch(border)
	 {
	 	case 0:
	 		spawnPos.y = -10;
	 		spawnPos.x = Math.floor(Math.random()*((width + 10)-(-10)+1)-10);
	 		break;

	 	case 1:
	 		spawnPos.y = height + 10;
	 		spawnPos.x = Math.floor(Math.random()*((width + 10)-(-10)+1)-10);
	 		break;

	 	case 2:
	 		spawnPos.y = Math.floor(Math.random()*((height + 10)-(-10)+1)-10);
	 		spawnPos.x = -10;
	 		break;

	 	case 3:
			spawnPos.y = Math.floor(Math.random()*((height + 10)-(-10)+1)-10);
	 		spawnPos.x = width + 10;
	 		break;

	 	default:
	 		break;
	 }

	var movingDir = new Vector2D(middleVector.x - spawnPos.x, middleVector.y - spawnPos.y);
	movingDir = vectorNormalize(movingDir);

	var tEnemy = new MovingObject(spawnPos.x, spawnPos.y, enemySpeed, movingDir);
	enemies.push(tEnemy);
}

function updateBulletsPosition()
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
			ellipse(newPosX,newPosY,bulletSize);
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

	for(i = 0; i < enemiesLength; i++)
	{
		var newPosX = enemies[i].curX + (enemies[i].dir.x * enemySpeed);
		var newPosY = enemies[i].curY + (enemies[i].dir.y * enemySpeed);
		enemies[i].curX = newPosX;
		enemies[i].curY = newPosY;

		fill(255,0,0);
		noStroke();
		ellipse(newPosX,newPosY,enemyWidth);
	}
}

function bulletHitDetection()
{
	var lengthCheck = (enemyWidth * 0.5) + (bulletSize * 0.5);

	var bulletsLength = bullets.length;
	var enemiesLength = enemies.length;

	var bulletCleanList = [];
	var enemiesCleanList = [];

	for(var i = 0; i < bulletsLength; i++)
	{

		for(var j = 0; j < enemiesLength; j++)
		{
			var vectorBetween = new Vector2D(0,0);
			vectorBetween.x = enemies[j].curX - bullets[i].curX;
			vectorBetween.y = enemies[j].curY - bullets[i].curY;

			if(vectorMagnitude(vectorBetween) <= lengthCheck)
			{
				bulletCleanList.push(i);
				enemiesCleanList.push(j);
				score++;
				break;
			}
		}
	}

	var bulletCleanListLength = bulletCleanList.length;
	var enemiesCleanListLength = enemiesCleanList.length;

	for(i = 0; i < bulletCleanListLength; i++)
	{
		bullets.splice(bulletCleanList[i], 1);
	}

	for(i = 0; i < enemiesCleanListLength; i++)
	{
		enemies.splice(enemiesCleanList[i], 1);
	}
}

function enemyHitDetection()
{
	var lengthCheck = (homeThrobberRadius * 0.5) + (enemyWidth * 0.5);

	var enemiesLength = enemies.length;
	var enemiesCleanList = [];

	for(var i = 0; i < enemiesLength; i++)
	{
		var vectorBetween = new Vector2D(0,0);
		vectorBetween.x = middleVector.x - enemies[i].curX;
		vectorBetween.y = middleVector.y - enemies[i].curY;

		if(vectorMagnitude(vectorBetween) <= lengthCheck)
		{
			enemiesCleanList.push(i);
			updateLife(-1);
			break;
		}
	}

	var enemiesCleanListLength = enemiesCleanList.length;

	for(i = 0; i < enemiesCleanListLength; i++)
	{
		enemies.splice(enemiesCleanList[i], 1);
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