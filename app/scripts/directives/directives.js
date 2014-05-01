'use strict';

angular.module( 'appSearchApp' )
	.directive( 'aafHeader', function () {
		return {
			templateUrl: 'partials/directives/header.html',
			restrict:    'E',
			replace:     true
		};
	} )
	.directive( 'aafFooter', function () {
		return {
			templateUrl: 'partials/directives/footer.html',
			restrict:    'E',
			replace:     true
		};
	} )
	.directive( 'aafAppContainer', function () {
		return {
			templateUrl: 'partials/directives/appContainer.html',
			restrict:    'E',
			replace:     true
		};
	} )
	.directive( 'noAnimate', function ( $animate ) { //fixes ngAnimate being applied to bootstrap.ui elements and breaking them...like Carousel
		return{
			link: function ( $scope, $element, $attrs ) {
				$animate.enabled( false, $element );
			}
		}
	} )
	.directive('myYoutube', function($sce) { //to embed the video links into a pop-up
		return {
			restrict: 'EA',
			scope: { code:'=' },
			replace: true,
			template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
			link: function (scope) {
				console.log('here');
				scope.$watch('code', function (newVal) {
					if (newVal) {
						scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
					}
				});
			}
		};
	});