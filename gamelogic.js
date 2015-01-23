var selectorOn = function(cursor){
		// console.log("Ya Entered!")
	var spent = this.classList.contains("spent");
	var blank = this.classList.contains("blank");
	var select = this.classList.contains("select");
	

	if (!spent) {
		  if (blank) {
		  	this.classList.remove("blank");
		  }
		  
		  if (!select) {
		  	this.classList.add("select");
		  }
	}	

	return false;
};

 var selectorOff = function(cursor){
 		// console.log("Ya Left")
    var spent = this.classList.contains("spent");
	var blank = this.classList.contains("blank");
	var select = this.classList.contains("select");

	if(!spent){
		if (select){
			this.classList.remove("select");
		}
		if (!blank){
			this.classList.add("blank");
		}
	}
	return false;
};

var userClick = function(event){

	var spent = this.classlist.contains("spent")

	if (!spent){
		if(turn % 2 == 0){
			this.innerHTML='<div class="box">X</div>';
			this.classList.add("x","spent");
		}

		else { 
			this.innerHTML='<div class="box">O</div>';
			this.classList.add("o","spent");
		}

	}


// WIN LOGIC TOWN 
if (turnNumber>=4) {
	console.log("Wins Enabled");

	if (turnNumber%2==0){
		win = findWin (true, false);
	}
	else{
		win = findWin (false, true);
	}
	turnNumber++;
  }	
  return false;
};

function findWin(xTurn, oTurn){
	var currentTurn;
	if (xTurn){
		currentTurn="x";
	}
	else if (oTurn){
		currentTurn="o";
	}


findClass = currentTurn + "spent";
// Returns Boxes with spent class + who claimed them
spentClass = document.getElementsByClassName(spentClass);


console.log(spentClass);

var spentBoxes = [];
for(var i=0; i < spentClass.length; i++){

	spentBoxes.push(spentClass[i].id); 
}
var win = false; 

var victoryCases = [['1','2','3'], ['4','5','6'],['7','8','9'],['2','5','8'],['1','4','7'],['1','5','9'],['3','5','7']['3','6','9']]

for (var v = 0; q<victoryCases.length; v++){
	console.log(victoryCases[0] [0]);
	if (spentBoxes.indexOf(victoryCases [v] [0] != -1)){
		if(spentBoxes.indexOf(victoryCases [v] [1] != -1)){
			if(spentBoxes.indexOf(victoryCases [v] [2] != -1)){
				alert("Winner Winner Donkey Lunch");
				win = true; 
			}
		}
	}
	console.log(spentBoxes);
}
}
// No Mas Functions 

var daBoxes = document.getElementsByClassName("box");

var turnNumber = 0;
var boxCount = daBoxes.length;


// Handlers 
for (var i =0; i < daBoxes; i++){
daBoxes[i].onmouseover = selectorOn;
daBoxes[i].onmouseout = selectorOff;
daBoxes[i].onmousedown = userClick;
}
