var hangman = {
	wins : 0,
	guessesRemaining : 200,
	wrongLetters : [],
	currentWord : "COWBOY",
	wordList : ["CAPITOLS", "LETTERS"],
	handler : function(letter){
		// input must be a letter not guessed
		if( "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter) && !hangman.wrongLetters.includes(letter) ){
			// determine if guessed letter is correct
			this.checkLetter( letter );
			
			// if solved, update score and reset board
		}		
	},
	checkLetter : function( letter ){
		if( this.currentWord.includes(letter) ){
			// insert all instances of this letter in word
			// 
			this.updateStatus();
			this.checkWord();
		}else{ // word does not include given letter
			this.wrongLetters.push(letter);
			var wrongLettersString = this.wrongLetters[0];
			for( var i=1; i<this.wrongLetters.length; i++){
				if( !this.currentWord.includes( letter ) ){
					wrongLettersString += ", " + this.wrongLetters[i];
				}
			}
			document.getElementById("guesses").innerHTML = wrongLettersString;
			this.updateStatus();
		}
	},
	// update correct and incorrect guesses and display
	updateStatus : function(){

	},
	// check if word is solved
	checkWord : function(){

	}
};


// user enters keypress letter
document.onkeyup = function(event) {
	hangman.handler( String.fromCharCode(event.keyCode).toUpperCase() );
}