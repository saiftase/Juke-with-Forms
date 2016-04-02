juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $rootScope) {

	$scope.create = function(data) {
		PlaylistFactory.create(data)
		.then(function() {
			$scope.name = "";
			$scope.newPlaylist.$setPristine();
		});
	};
})

juke.controller('PlaylistsCtrl', function ($scope, PlaylistFactory) {
	PlaylistFactory.fetchAll()
	.then(function(playlists) {
		$scope.playlists = playlists;
	})
})							