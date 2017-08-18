var hangman = {
	wins : 0,
	guessesRemaining : 0,
	wrongLetters : [],
	currentWord : "",
	currentGuess : "",
	wordList : ["GREATSWORD", "DRAGON", "GOBLIN", "IMMOVABLE ROD", "BAG OF HOLDING", "PORTABLE HOLE", "MAGIC MISSILE", "FIREBALL", "MAGE HAND", "PRESTIDIGITATION", "WIZARD", "SORCERER", "DRUID", "CLERIC", "WARLOCK", "BARBARIAN", "RANGER", "PALADIN", "BEHOLDER", "OWLBEAR", "GELATINOUS CUBE", "DISPLACER BEAST", "BLINK DOG"],
	handler : function(letter){
		// if you've just won (or lost), reset board
		if( this.currentWord === this.currentGuess ){
			this.newWord();
		}else 
		// input is a letter not guessed
		if( "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter) && !hangman.wrongLetters.includes(letter) ){
			// determine if guessed letter is correct
			this.checkLetter( letter );
		}		
	},
	checkLetter : function( letter ){
		if( this.currentWord.includes(letter) ){
			// insert all instances of this letter in word
 			var guessUpdate = "";
 			for( var i=0; i<this.currentWord.length; i++){
				if( this.currentWord.charAt(i) === letter ){
					document.getElementById("letter"+i).innerHTML = letter;
					guessUpdate += letter;
				}else if( this.currentGuess.charAt(i) ){
					guessUpdate += this.currentGuess.charAt(i);
				}else if( this.currentWord.charAt(i) === " " ){
					guessUpdate += " ";
				}else{
					guessUpdate += 0;
				}
			}
			this.currentGuess = guessUpdate;
			if( this.currentWord === guessUpdate ){
				this.winCondition();
			}
		}else{ // word does not include given letter
			this.wrongLetters.push(letter);
			var wrongLettersString = this.wrongLetters[0];
			for( var i=1; i<this.wrongLetters.length; i++){
				if( !this.currentWord.includes( letter ) ){
					wrongLettersString += ", " + this.wrongLetters[i];
				}
			}
			document.getElementById("guesses").innerHTML = wrongLettersString;
			this.guessesRemaining--;
			document.getElementById("remaining").innerHTML = this.guessesRemaining + " guesses remaining.";
			if(!this.guessesRemaining){
				console.log("Out of guesses! You won " + this.wins +" times.");
				this.wins = 0;
				document.getElementById("wins").innerHTML = "";
				this.currentGuess = this.currentWord;
			}
		}
	},
	winCondition : function(){
		console.log("winner");
		this.wins++;
		document.getElementById("wins").innerHTML = "solved: " + this.wins;
	},
	newWord : function(){
		while( this.currentGuess === this.currentWord ){
			this.currentWord = this.wordList[Math.floor(Math.random()*this.wordList.length)];
		}
		this.currentGuess = "";
		this.wrongLetters = [];
		this.guessesRemaining = 12;
		document.getElementById("remaining").innerHTML = this.guessesRemaining + " guesses.";
		var wordString = "";
		for( var i=0; i<this.currentWord.length; i++ ){
			if( this.currentWord.charAt(i) === " " ){
				wordString += "<div class='space' id='letter"+i+"'></div>";
			}else{
				wordString += "<div id='letter"+i+"'>&nbsp;</div>";
			}
		}
		document.getElementById("word").innerHTML = wordString;
		document.getElementById("guesses").innerHTML = "";
	}
};

// start a new hangman
hangman.newWord();

// user enters keypress letter
document.onkeyup = function(event) {
	hangman.handler( String.fromCharCode(event.keyCode).toUpperCase() );
}