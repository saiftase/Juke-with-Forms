juke.controller('PlaylistFormCtrl', function ($scope, PlaylistFactory, $state) {

	$scope.create = function(data) {
		PlaylistFactory.create(data)
		.then(function(playlist) {
			$scope.name = "";
			$scope.newPlaylist.$setPristine();
			$state.go('playlist',{id: playlist._id});
		});
	};
})

juke.controller('PlaylistsCtrl', function ($scope, PlaylistFactory) {
	PlaylistFactory.fetchAll()
	.then(function(playlists) {
		$scope.playlists = playlists;
	})
})							

juke.controller('PlaylistCtrl', function ($scope, $stateParams, PlaylistFactory, PlayerFactory, SongFactory) {
	$scope.playlistSongs = [];

	PlaylistFactory.fetchById($stateParams.id)
	.then(function(playlist) {
		$scope.playlist = playlist;
		playlist.songs = convertSongs(playlist.songs)
		angular.copy(playlist.songs, $scope.playlistSongs);
	});

	SongFactory.fetchAll()
	.then(function(songs) {
		$scope.songList = songs;
	});

	$scope.addSong = function (song, id) {
		PlaylistFactory.addSong (song, id)
		.then(function(newSong) {
			$scope.playlistSongs.push(SongFactory.convert(newSong));
			console.log($scope.playlistSongs);
		})
	}

	function convertSongs(songs){
		return songs.map(function(song){
			return SongFactory.convert(song);
		})
	};

	$scope.toggle = function (song) {
	  if (song !== PlayerFactory.getCurrentSong()) {
	    PlayerFactory.start(song, $scope.playlistSongs);
	  } else if ( PlayerFactory.isPlaying() ) {
	    PlayerFactory.pause();
	  } else {
	    PlayerFactory.resume();
	  }
	};

	$scope.getCurrentSong = PlayerFactory.getCurrentSong;

	$scope.isPlaying = function (song) {
	  return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
	};

})