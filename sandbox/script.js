// __________________FUNCTION JUNCTION____________________________

// Function For OnMouse Over Effect
function selectorOn(data){ 
 		var spentCheck = this.classList.contains('spent'); 
 		// Checks if the space is occupado. 
		var blankCheck = this.classList.contains('select');
		// Checks if the space is available.
	
	if (!spentCheck){
		// If space is available appies "blank" class. 
		if (!blankCheck){
			this.classList.add('select');
		// Places effect on open square.
		}		
	}
	return false;
	// cancels event activated function.
};

function selectorOff(data){ 

var spentCheck = this.classList.contains('spent'); 
var blankCheck = this.classList.contains('select');

if (!spentCheck){
		if(blankCheck){
			this.classList.remove('select');
		}
}
return false;
};

function userInput(click){

	var spentCheck = this.classList.contains('spent');
	
	if(!spentCheck){
		// Players can only click on open spaces
			if (currentTurn %2 == 0){
				// Checks to see whose turn it is, if true Player 1 (x) gets to move 
				this.classList.add('x','spent');
				this.classList.remove('select');
				// Adds stlye class for x renders space unclickable. 
			}
			else{ 
				// It is Player 2's (o) turn.
				this.classList.add('o','spent');
				this.classList.remove('select');
				// Adds stlye class for (o) and renders space unclickable
			}
	}
	if(currentTurn>= 4){
		// Program starts checking for winners.
		var victory = " ";
		// placeholder for win message.
			if(currentTurn%2==0){
				// Checks to see who is the victor if true it is Player One (x).
				playerWin = findWin('x');
				victory = "Player 1";
		  }
		  else {
		  	// Player 2 has the win condition.
		  	playerWin = findWin('o');
		  	victory = "Player 2";
		  }
		  if(playerWin){
		  	// If there is a winner do the rest of this junk. 
		  	var blowUp = document.getElementsByClassName('box');
		  	// Selects every div on the gameboard.

		  	for(var v=0; v<blowUp.length; v++){
		  		// Ends game and perhaps world.
		  			blowUp[v].classList.add('spent','flipOutX');
		  	}
		    document.getElementById('victor').innerHTML = "<h1 id='victor'>" + victory + ' is victorious</h1>';
		    // Displays winning player.
		  }
		  if(currentTurn==8 && !playerWin){
		  	// checks for a bowtie because they are cool.
		  	document.getElementById('toad').innerHTML = "<h1 id='toad'>" +'All are victorious in the eyes of the Hypnotoad</h1>';
		  	// Displays the tie message
		    sisyphus();
		    // Play again function
		  } 
	} 
	currentTurn++; 
	// Turn engine, the part that breaks my game the most
	return false;
	// ends click functionality
};

// _________________________________________________________________________________

function findWin(currentTurn){
	console.log("Searching for win");
	// Win logic function
  var winState = false;
	// variable that switiches win state on and off
	var victoryVariables = [['1','2','3'],['4','5','6'],['7','8','9'],['3','6','9'],['2','5','8'],['1','4','7'], ['1','5','9'],['7','5','3']];
	// An array of win conditions 
	var spentSearch = currentTurn + ' spent';
	// Collects all spent boxes into a string paired with which player selected them. 
	console.log(currentTurn);
	
	
	var playerSpent = document.getElementsByClassName(spentSearch);
	// A win can only happen on a current players turn- this selects all the spaces that have been selected by that player. 
	console.log(playerSpent);
	var spentBoxes = [];	
		for(var p=0; p < playerSpent.length; p++){
			spentBoxes.push(playerSpent[p].id);
		
		}


		// Pushes current players spent boxes into an array. 
		for(var v=0;v<victoryVariables.length; v++){
			  if((spentBoxes.indexOf(victoryVariables[v][0])!=-1)&&(spentBoxes.indexOf(victoryVariables[v][1])!= -1)&&(spentBoxes.indexOf(victoryVariables[v][2])!=-1)){
			  // Checks id # of selected boxes against the win condition array space by space each statement checks the index of the player and victor array
			  		winState = true;
			  // Toggles win condition.
			  }

		}
		return winState;
}


function cleanSlate(){
	for(var i = 0; i<allBoxes;i++){
			getBoxes[i].classList.add('blank');
			// Removes x's o's and spents.
	}
	currentTurn = 0;
	winState=false;
}
function classExit(){
	for(var i = 0;i<allBoxes;i++){
		getBoxes[i].classList.remove('spent');
		getBoxes[i].classList.remove('x');
		getBoxes[i].classList.remove('o');
	}
}




// BOARD INITIATION SETTINGS 
var getBoxes = document.getElementsByClassName('box'); 
var currentTurn = 0;
var allBoxes = getBoxes.length;
var playerWin = false; 


for (var i=0; i<getBoxes.length;i++){
		getBoxes[i].addEventListener('mouseover', selectorOn);
		getBoxes[i].addEventListener('mouseout', selectorOff);
		getBoxes[i].addEventListener('mousedown', userInput );

}





