# miniex 5: Bad poem generator

![Screenshot of the project](miniEx5_BadPoemGenerator.png?raw=true "Screenshot of the project")

For this miniex, I made a simple little generator of poems. I tried approaching the project, with making a generator which made versions of the classic "roses are red"-poems, but failed. Instead I made somewhat of a mess, which you can try out [here](https://epsilon99.github.io/AestheticProgrammingCourse/MiniExcercises/MiniEx_5/).

I really didn't like this miniexcercise too much. The libary we were to use, didn't really have an easy access to it, plus some features really didn't make much sense to me (I'll get back to those). It might help getting to know the libary a bit better, but I really didn't find its structure and functions intuitive enough for me to find a proper workflow.

**Some of the problems I had with the Libary.**
As mentioned, I tried to use a certain poem as the structure of the generator. But trying to randomize something with the framework of RiTa, seemed to much of a hazzle. For example, you can easily find the POS when you're searching for a random word, but trying to find the syllabal count is near impossible with the libary (Of what I found searching through the refference). 
   This also was apparent when finding words that rhymed. I could easily get a whole array of words that matched the criteria of the rhyming par, but nothing else; no POS no syllabal count etc. This means that you have to process the entire rhyme-array yourself, instead of just having the libary sort these thing with at parsing of parameters.

These things kinda annoyed me, because the reason of having the libary in the first place, is to make it easier to use words and proper grammar. But if I have to do most of the work myself, with limitations of the RiTa libary, then it maybe hinders more than it helps. As a creative idea, I like the RiTa libary. But in practice, I do not quite fancy it.