'use strict';

angular.module( 'appSearchApp' )
	.controller( 'TrendingCtrl', function ( $scope, searchTop, categoryServ ) {
		$scope.location = 'trending';
		$scope.searchData = null;
		$scope.list = {
			display: 'Choose List',
			val : null
		};
		$scope.category = {
			display :'Choose Category',
			val : null
		};

		//controls the opening of specific items todo: move to directive
		$scope.selected = {
			item: null
		};

		$scope.top = {
			list : {
			       "Pupular this Week" : "top_apps_overall_weekly",
			       "Trending Today" : "top_apps_trending_daily"
			},
			category : categoryServ
		}

		$scope.getTop = function(){
			console.log("try Search");
			console.log($scope.list.val);
			console.log($scope.category.val);
			if($scope.list.val && $scope.category.val){
				console.log("search!")
				var params = {
					listName:     $scope.list.val,
					category:     $scope.category.val
				};
				searchTop.get( params ).then(function(data){refreshData(data)});
			}
		}

		function refreshData(data){
			$scope.searchData = {};
			$scope.searchData.results = data.appList;
			$scope.selected.item = null;
		}

	} );
