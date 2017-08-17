var hangman = {
	wins : 0,
	guessesRemaining : 0,
	wrongLetters : [],
	currentWord : "",
	currentGuess : "",
	wordList : ["CAPITOLS", "LETTERS"],
	handler : function(letter){
		// input must be a letter not guessed
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
				}else{
					guessUpdate += 0;
				}
			}
			this.currentGuess = guessUpdate;
			console.log(this.currentGuess);
			if( this.currentWord === this.currentGuess ){
				this.wins++;
				this.newWord();
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
				alert("Out of guesses! You won " + this.wins +" times.");
				this.wins = 0;
				this.newWord();
			}
		}
	},
	newWord : function(){
		this.currentWord = this.wordList[Math.floor(Math.random()*this.wordList.length)];
		this.guessesRemaining = 12;
		document.getElementById("remaining").innerHTML = this.guessesRemaining + " guesses.";
		var wordString = "";
		for( var i=0; i<this.currentWord.length; i++ ){
			wordString += "<div id='letter"+i+"'>&nbsp;</div>";
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