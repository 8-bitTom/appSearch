'use strict';

angular.module( 'appSearchApp' )
	.controller( 'MainCtrl', function ( $scope, $log, searchSrv ) {
		$scope.location = 'home';
		$scope.query = "";
		$scope.searchData = null;
		$scope.paging = {
			currentPage : 1,
			totalItems: 1,
			limit: 1,
			maxSize : 5
		};

		$scope.selected = {
			item : null
		};

		$scope.doSearch = function () {
			var params = {q: $scope.query};

			searchSrv.get( params ).then(function(data){refreshData(data)});
		}

		$scope.checkEnter = function(evt){
			if(evt.which === 13){
				$scope.doSearch();
			}
		}

		$scope.$watch( function () {
			return $scope.paging.currentPage;
		}, function ( newVal, oldVal ) {
			if ( newVal !== oldVal ) {
				searchSrv.goToPage(newVal ).then(function(data){refreshData(data)});
			}
		} );

		function refreshData(data){
			$scope.searchData = data;
			$scope.paging.totalItems = data.number_results;
			$scope.paging.currentPage = data.page;
			$scope.paging.limit = data.limit;
			$scope.selected.item = null;
		}

	} );
