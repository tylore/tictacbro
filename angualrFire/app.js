var app = angular.module('tickApp', ['firebase']);

app.controller('TickCtrl', function ($scope, $firebase) {

	$scope.board = $firebase(new Firebase("https://tictacbro.firebaseio.com/board")).$asArray();
	// tracks the board state
	$scope.counter = $firebase(new Firebase("https://tictacbro.firebaseio.com/counter")).$asArray();
	// tracks the turn number and chicken whose turn it is currently
	$scope.chickens = $firebase(new Firebase("https://tictacbro.firebaseio.com/chickens")).$asArray();
	// tracks chicken victory status and keeps track of wins. 

	$scope.board.$loaded(function () {
		if ($scope.board.length === 0) {
			for (var i = 0; i < 9; i++) {
				$scope.board.$add({token: ''});
			}
		// If none exist builds 9 BOARD placeholders in firebase 
		} else {
			for (var i = 0; i < 9; i++) {
				$scope.board[i].token = '';
				$scope.board.$save($scope.board[i]);
			}
		}
		// Wipeout function to make sure every game starts on game load with a clean slate.

		for (var i = 0; i < $scope.chickens.length; i++) {
			$scope.chickens.$remove($scope.chickens[i]);
		}
		// Cleans out the chicken record, almost as if what they do doesn't even matter (Firebase orginization) 
		
		$scope.chickens.$add( {
			whichChicken: 'x',
			rowScore: [0,0,0],
			colScore: [0,0,0],
			diagScore: [0,0],
			winCount: 0
		});
		$scope.chickens.$add( {
			whichChicken: 'o',
			rowScore: [0,0,0],
			colScore: [0,0,0],
			diagScore: [0,0],
			winCount: 0
		});
        
	});
	// Establishes win condition folder and tracking on firebase. 

	$scope.counter.$loaded(function () {
		if ($scope.counter.length === 0) {
			$scope.counter.$add({turnCounter: 0, chickenUp: 'x'});
		} else {
			$scope.counter[0].turnCounter = 0;
			$scope.counter[0].chickenUp = 'x';
			$scope.counter.$save($scope.counter[0]);
		}
	});
	// Turns must be kept on Firebase, here is where that happens, primes X as first turn.

	$scope.boxClick = function (index) {
		if (	$scope.counter[0].turnCounter % 2 == 0 && 
				$scope.board[index].token == '' && 
				$scope.counter[0].chickenUp == 'x'

		// If you are a chicken and it is your turn you place a token only if the space you desire is unoccupied.
		  ) {
			$scope.board[index].token = 'x';
			$scope.board.$save($scope.board[index]);
			// sets and saves the chicken token selection to Firebase
			$scope.counter[0].turnCounter++;
			// turns up the turn by 1. 
			$scope.counter[0].chickenUp = 'o';
			// toggles the chicken who is up next (next to click). 
			$scope.counter.$save($scope.counter[0]);
			// saves turn increment to firebase
			$scope.victorMessageX = 0; 
			$scope.victorMessageO = 0;
			$scope.victorMessageTie = 0; 
			// resets victory message on click.
	// 		      _________________
 //   .-"""-----..._    _..-`-._
 //  ";--.  <^"o";  "."" ."o"^> "-.      _____________________
 //    \_/\  `"""         ^^^^_/"/      *  Brooke's Win Logic                  
 //     /( "-._.-""/    \""--" |"\      *       *
 //    // \      _.-""""-.     |  |     *_____________________*
 //    |/ |\   ." \ TTTT /   _./  |
 //   //. | ";\ \|\Y    Y/|"| | | |
 //  / // |_/  \ |_ LLLL _|/  | | |
 // (_/ | |     \  """""" /   / / /
 //   | / |      \       /   | |_/
 //   \/| |       """""""    | |  
 //     ( |                  | /



			if (index == 0) {
				$scope.chickens[$scope.chickens.length-2].rowScore[0]++;
				$scope.chickens[$scope.chickens.length-2].colScore[0]++;
				$scope.chickens[$scope.chickens.length-2].diagScore[0]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 1) {
				$scope.chickens[$scope.chickens.length-2].rowScore[0]++;
				$scope.chickens[$scope.chickens.length-2].colScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 2) {
				$scope.chickens[$scope.chickens.length-2].rowScore[0]++;
				$scope.chickens[$scope.chickens.length-2].colScore[2]++;
				$scope.chickens[$scope.chickens.length-2].diagScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 3) {
				$scope.chickens[$scope.chickens.length-2].rowScore[1]++;
				$scope.chickens[$scope.chickens.length-2].colScore[0]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 4) {
				$scope.chickens[$scope.chickens.length-2].rowScore[1]++;
				$scope.chickens[$scope.chickens.length-2].colScore[1]++;
				$scope.chickens[$scope.chickens.length-2].diagScore[0]++;
				$scope.chickens[$scope.chickens.length-2].diagScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 5) {
				$scope.chickens[$scope.chickens.length-2].rowScore[1]++;
				$scope.chickens[$scope.chickens.length-2].colScore[2]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 6) {
				$scope.chickens[$scope.chickens.length-2].rowScore[2]++;
				$scope.chickens[$scope.chickens.length-2].colScore[0]++;
				$scope.chickens[$scope.chickens.length-2].diagScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 7) {
				$scope.chickens[$scope.chickens.length-2].rowScore[2]++;
				$scope.chickens[$scope.chickens.length-2].colScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			} else if (index == 8) {
				$scope.chickens[$scope.chickens.length-2].rowScore[2]++;
				$scope.chickens[$scope.chickens.length-2].colScore[2]++;
				$scope.chickens[$scope.chickens.length-2].diagScore[0]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			}

			if ($scope.counter[0].turnCounter >= 4) {
				$scope.victor();
			}
			// Check to see who the best chicken is each turn after 5 turns. 

		} else if (	$scope.counter[0].turnCounter % 2 != 0 &&
					$scope.board[index].token == '' &&
					$scope.counter[0].chickenUp == 'o') {
			$scope.board[index].token = 'o';
			$scope.board.$save($scope.board[index]);
			$scope.counter[0].turnCounter++;
			$scope.counter[0].chickenUp = 'x';
			$scope.counter.$save($scope.counter[0]);

			if (index == 0) {
				$scope.chickens[$scope.chickens.length-1].rowScore[0]++;
				$scope.chickens[$scope.chickens.length-1].colScore[0]++;
				$scope.chickens[$scope.chickens.length-1].diagScore[0]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 1) {
				$scope.chickens[$scope.chickens.length-1].rowScore[0]++;
				$scope.chickens[$scope.chickens.length-1].colScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 2) {
				$scope.chickens[$scope.chickens.length-1].rowScore[0]++;
				$scope.chickens[$scope.chickens.length-1].colScore[2]++;
				$scope.chickens[$scope.chickens.length-1].diagScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 3) {
				$scope.chickens[$scope.chickens.length-1].rowScore[1]++;
				$scope.chickens[$scope.chickens.length-1].colScore[0]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 4) {
				$scope.chickens[$scope.chickens.length-1].rowScore[1]++;
				$scope.chickens[$scope.chickens.length-1].colScore[1]++;
				$scope.chickens[$scope.chickens.length-1].diagScore[0]++;
				$scope.chickens[$scope.chickens.length-1].diagScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 5) {
				$scope.chickens[$scope.chickens.length-1].rowScore[1]++;
				$scope.chickens[$scope.chickens.length-1].colScore[2]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 6) {
				$scope.chickens[$scope.chickens.length-1].rowScore[2]++;
				$scope.chickens[$scope.chickens.length-1].colScore[0]++;
				$scope.chickens[$scope.chickens.length-1].diagScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 7) {
				$scope.chickens[$scope.chickens.length-1].rowScore[2]++;
				$scope.chickens[$scope.chickens.length-1].colScore[1]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			} else if (index == 8) {
				$scope.chickens[$scope.chickens.length-1].rowScore[2]++;
				$scope.chickens[$scope.chickens.length-1].colScore[2]++;
				$scope.chickens[$scope.chickens.length-1].diagScore[0]++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
			}

			if ($scope.counter[0].turnCounter >= 4) {
				$scope.victor();
			}
		} 
	};

	$scope.victor = function () {
		for (var v = 0; v < 3; v++) {
			if (	$scope.chickens[$scope.chickens.length-2].rowScore[v] == 3 ||
					$scope.chickens[$scope.chickens.length-2].colScore[v] == 3 ||
					$scope.chickens[$scope.chickens.length-2].diagScore[v] == 3) {
				// This elegant win condition allowed me to troubleshoot my firebase a bit more than
				// the mass array checking method I had previously
				$scope.victorMessageX = 1;
				$scope.chickens[$scope.chickens.length-2].winCount++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
				$scope.reset();
			// 

			} else if (	$scope.chickens[$scope.chickens.length-1].rowScore[v] == 3 ||
						$scope.chickens[$scope.chickens.length-1].colScore[v] == 3 ||
						$scope.chickens[$scope.chickens.length-1].diagScore[v] == 3) {
				$scope.victorMessageO = 1; 
				$scope.chickens[$scope.chickens.length-1].winCount++;
				$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
				$scope.reset();

			} else if ($scope.counter[0].turnCounter == 9) {
				$scope.tie = true;
				$scope.victorMessageTie = 1;a
				$scope.reset();
			}
		}
	};

	$scope.reset = function () {
		if ($scope.board.length === 0) {
			for (var i = 0; i < 9; i++) {
				$scope.board.$add({token: ''});
			}
		} else {
			for (var i = 0; i < 9; i++) {
				$scope.board[i].token = '';
				$scope.board.$save($scope.board[i]);
			}
		}

		$scope.chickens[$scope.chickens.length-2].rowScore = [0,0,0];
		$scope.chickens[$scope.chickens.length-2].colScore = [0,0,0];
		$scope.chickens[$scope.chickens.length-2].diagScore = [0,0,0];
		$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
		$scope.chickens[$scope.chickens.length-1].rowScore = [0,0,0];
		$scope.chickens[$scope.chickens.length-1].colScore = [0,0,0];
		$scope.chickens[$scope.chickens.length-1].diagScore = [0,0,0];
		$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);

		$scope.counter[0].turnCounter = 0;
		$scope.counter[0].chickenUp = 'x';
		$scope.counter.$save($scope.counter[0]);

	};
	// Fires automatically after win and firebombs FireBase data but keeps win counts around. 

	$scope.tryAgain = function () {
		if ($scope.board.length === 0) {
			for (var i = 0; i < 9; i++) {
				$scope.board.$add({token: ''});
			}
		} else {
			for (var i = 0; i < 9; i++) {
				$scope.board[i].token = '';
				$scope.board.$save($scope.board[i]);
			}
		}

		if ($scope.chickens.length != 0) {
			$scope.chickens[$scope.chickens.length-2].rowScore = [0,0,0];
			$scope.chickens[$scope.chickens.length-2].colScore = [0,0,0];
			$scope.chickens[$scope.chickens.length-2].diagScore = [0,0,0];
			$scope.chickens[$scope.chickens.length-2].winCount = 0;
			$scope.chickens.$save($scope.chickens[$scope.chickens.length-2]);
			$scope.chickens[$scope.chickens.length-1].rowScore = [0,0,0];
			$scope.chickens[$scope.chickens.length-1].colScore = [0,0,0];
			$scope.chickens[$scope.chickens.length-1].diagScore = [0,0,0];
			$scope.chickens[$scope.chickens.length-1].winCount = 0;
			$scope.chickens.$save($scope.chickens[$scope.chickens.length-1]);
		} else {
			$scope.chickens.$add( {
				whichChicken: 'x',
				rowScore: [0,0,0],
				colScore: [0,0,0],
				diagScore: [0,0],
				winCount: 0
			});
			$scope.chickens.$add( {
				whichChicken: 'o',
				rowScore: [0,0,0],
				colScore: [0,0,0],
				diagScore: [0,0],
				winCount: 0
			});
		}

		$scope.counter[0].turnCounter = 0;
		$scope.counter[0].chickenUp = 'x';
		$scope.counter.$save($scope.counter[0]);
	};
// Resets everthing including win counters

});