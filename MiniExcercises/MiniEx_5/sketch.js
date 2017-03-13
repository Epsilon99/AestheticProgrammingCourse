var lexicon;

var poem;
var tRandomPoem = [];

function preload()
{
	poem = loadStrings("data/poem.txt");
}

function setup()
{
	createCanvas(windowWidth,windowHeight);
	lexicon = RiLexicon();
	processPoem();

	var syll = RiTa.getSyllables("derp");
	console.log(syll);
}

function draw()
{
	createCanvas(windowWidth,windowHeight);
	clear();
	writeText();
}

function processPoem()
{
	var wordToRhyme1;
	var wordToRhyme2;

	for(var i = 0; i < poem.length; i++)
	{
		var r = new RiString(poem[i]);
		var words = r.words();
		var rPos = r.pos();
		var randomVerse = "";

		// Messy shit, I should just have allocated the whole thing as ritastrings, bur didn't think of it in time.
		// Therefore I need to do some dumb coding to get the words I wanna rhyme on.
		
		for(j = 0; j < words.length; j++)
		{
			if(i == poem.length - 2 && j == words.length -1)
			{
				var tRhyme = lexicon.rhymes(wordToRhyme1);

				if(tRhyme.length > 0)
				{
					randomVerse += tRhyme[0];
				}
			}
			else if(i == poem.length - 1 && j == words.length -1)
			{
				var tRhyme = lexicon.rhymes(wordToRhyme2);
				
				if(tRhyme.length > 0)
				{
					randomVerse += tRhyme[0];
				}
			}
			else
			{
				var randomWord = lexicon.randomWord(rPos[j], 2);

				if(i == 0 && j == words.length - 1)
				{
					wordToRhyme1 = randomWord;
				}
				if(i == 1)
				{
					wordToRhyme2 = randomWord;
				}

				randomVerse += randomWord;
			}
	
			randomVerse += " ";
		}

		tRandomPoem[i] = randomVerse;
	}
}

function writeText()
{
	var curTextSize = windowHeight / 15;

	for(var i = 0; i < tRandomPoem.length; i++)
	{
		fill(0);
		textAlign(CENTER);
		textSize(curTextSize);
		text(tRandomPoem[i], width * 0.5, curTextSize + (curTextSize * i) + (curTextSize) * 0.5);
	}

	fill(0);
	textAlign(CENTER);
	textStyle(ITALIC);
	textSize(curTextSize / 2);
	text("click the mouse \n to get a new meaningful poem!", width * 0.5, curTextSize + (curTextSize * 6) + (curTextSize) * 0.5);
}

function mouseClicked()
{
	clear();
	processPoem();
	writeText();
}