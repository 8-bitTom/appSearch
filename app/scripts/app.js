'use strict';

angular
	.module( 'appSearchApp', [
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap'
	] )
	.config( function ( $routeProvider, $locationProvider ) {
		$locationProvider.html5Mode( true );
		$routeProvider
			.when( '/', {
				templateUrl: 'partials/main.html',
				controller:  'MainCtrl'
			} )
			.when('/trending', {
			  templateUrl: 'partials/trending.html',
			  controller: 'TrendingCtrl'
			})
			.when('/search', {
			  templateUrl: 'partials/search.html',
			  controller: 'SearchCtrl'
			})
			.otherwise( {
				redirectTo: '/'
			} );
	} );
