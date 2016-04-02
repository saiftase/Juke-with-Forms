'use strict'

juke.config( function ($stateProvider) {
	$stateProvider.state('newplaylist', {
		url: '/newplaylist',
		templateUrl: '/js/playlist/templates/newplaylist.html',
		controller: 'PlaylistCtrl'
	});
});