# miniex 2: Dancing John

The idea behind the project Dancing John, was to have a cartoon character whom expresses noise (in a programming sense).

The noise is expressed with the "unnecessary" randomness that dictates the appearance of Dancing John. 
  I've used the pseudo randomness of the JS function Math.random(), using segments of the date (windows date) as seeds, which are updated during run time. This is to make the program less predictable from a greater perspective, but is utterly unnecessary for the scope of the project. It should be taken as a kind of parody of "randomness" in code and it's predictability.
  Another random aspect of Dancing John, is his flopping arms, which is randomly generated only with restrictions for the max length of his arms. This is not ideal from the perspective of anatomy and proportions of the "human" body.

On top of all the randomness, you will eventually have seeds that makes for an unidentifiable character:
* No arms, since the length can be zero.
* Same skin and shirtcolor. If black, logo on shirt won't be visible.
* No visible pupils, since they also can be 0.

 But since the interval is so short, and most seeds will generate a perfectly readable character, what does the difference make for the viewer? You might even call it a glitch, since it's a rare case which doesn't break the program, but breaks the understanding of the program for the few viewers whom might see one of the unreadable seeds. The issue could easily be fixed, but is it worth the cost of resources? 

 You can see the result on my GitHub page
 https://github.com/Epsilon99/AestheticProgrammingCourse/tree/gh-pages/MiniEx_2