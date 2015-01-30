var app = angular.model('TicTacBro', []);

app.controller('TTTCtrl', ['$scope', function($scope){

	 $scope.board = [["","",""], ["","",""],["","",""]];
	console.log($scope);

	$scope.squareClick = function(row, col){
		$scope.board[row][col] = "i got clicked";
		console.log($scope.board[indexOfBoard]);
		board [0] [0]; 
	};

	



}]);