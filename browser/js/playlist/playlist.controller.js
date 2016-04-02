juke.controller('PlaylistFormCtrl', function ($scope, PlaylistFactory, $rootScope) {

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

juke.controller('PlaylistCtrl', function ($scope, $stateParams, PlaylistFactory, PlayerFactory) {
	PlaylistFactory.fetchById($stateParams.id)
	.then(function(playlist) {
		$scope.playlist = playlist;
	});

	$scope.getCurrentSong = PlayerFactory.getCurrentSong;
	$scope.isPlaying = PlayerFactory.isPlaying;
})