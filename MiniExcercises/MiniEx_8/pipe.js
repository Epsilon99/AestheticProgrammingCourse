
function Pipe()
{
	this.gap = 40; //it's actually half the gap, since it is applied on both sides of center
	this.minSize = 10; //the smallest amount of pixels, a pipe segment can be
	this.center = Math.floor(random(this.minSize + this.gap, height - this.minSize - this.gap)); //Find the center, according to variables

	this.top = this.center - this.gap; //Find the top, according to center
	this.bottom = height - (this.center + this.gap); //Find the bottom according to center

	this.x = width;
	this.w = 60;
	this.speed = 2;

	this.hightlight = false;

	this.powerUp = false;
	this.powerUpSize = 20;

	this.show = function()
	{
		noStroke();
		fill(255);

		if(this.hightlight)
		{
			fill(255, 0 ,0);
		}

		rect(this.x, 0, this.w, this.top);
		rect(this.x, height - this.bottom, this.w, this.bottom);

		if(this.powerUp)
		{
			fill(255, 255, 0);
			rect(this.x + (this.w * .5) - 10 , this.center - 10, this.powerUpSize, this.powerUpSize); //Too tired at this point, so some hardcording... Don't do this at home kids! #SafetyFirst #CodeResponsibly
		}
	}

	this.update = function()
	{
		this.x -= this.speed;
	}

	this.offscreen = function()
	{
		if(this.x < - this.w)
			return true;
		else
			return false;
	}

	this.hits = function(bird)
	{
		//This nested if-loop, is flipped from the one in the tutorial. Check the README-file for more info.
		if(bird.x > this.x && bird.x < this.x + this.w)
		{
			if(bird.y < this.top || bird.y > height - this.bottom)
			{
				this.hightlight = true;
				return true;
			}
		}

		if(this.powerUp)
		{
			if(bird.x > (this.x + 20) && bird.x < (this.x + 40))
			{
				if(bird.y > this.center - 10 && bird.y < this.center + 10)
				{
					bird.flipPhysics();
					this.powerUp = false;
				}
			}
		}

		this.hightlight = false;
		return false;
	}
}