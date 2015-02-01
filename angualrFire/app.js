var app = angular.module('tickApp', ['firebase']);

app.controller('TickCtrl', function ($scope, $firebase) {

	$scope.board = $firebase(new Firebase("https://tictacbro.firebaseio.com/board")).$asArray();
	$scope.turnCount = $firebase(new Firebase("https://tictacbro.firebaseio.com/turnCount")).$asArray();
	$scope.players = $firebase(new Firebase("https://tictacbro.firebaseio.com/players")).$asArray();

	$scope.board.$loaded(function () {
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
	
	});

        
        $scope.turnCount.$loaded(function(){
        	if($scope.turnCount.length === 0) {
        		$scope.turnCount.$add({turnNum: 0, curentPlayer: "x"});       	
        	}else {
        		$scope.turnCount[0].turnNum= 0;
        		$scope.tunrCount[0].currentPlayer = "x";
        		$scope.turnCount.$save($scope.turnCount[0]);
        	}

        });
    

    // $scope.boxClick=function(boxIdx){
    // 	// console.log(boxIdx);
    // 	if($scope.turnCount[0].tunrNum % 2 === 0 && 
    // 		  $scope.board(boxIdx).token === '' &&
    // 		  $scope.turnCount[0].currentPlayer == "x"){
    	    
    // 	    $scope.board[boxIdx].token = 'x';
    // 	    $scope.board.$save($scope.board[boxIdx]);
    // 	    $scope.turnCount[0].turnNum++;
    // 	    $scope.turnCount.$save($scope.turnCount[0]);



    // 		// if(boxIdx == 0){
    // 		// 	$scope.players.length

    // 		}

    // 	};

    	
});
      

    	
    	

    


    
