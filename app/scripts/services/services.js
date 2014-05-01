'use strict';

var app = angular.module( 'appSearchApp' );

app.service( 'constants', function () {
	var out = {
		token: "638b6cc4762b4ffaf66260e94e42e5a70f233714"
	}
	return out;
} );

app.service( 'categoryServ', function(){
	var out = {
		0:  "All applications",
		1:  "All games",
		2:  "Books & Reference",
		3:  "Business",
		4:  "Comics",
		5:  "Communication",
		6:  "Education",
		7:  "Entertainment",
		8:  "Finance",
		9:  "Health & Fitness",
		10: "Lifestyle",
		11: "Media & Video",
		12: "Medical",
		13: "Music & Audio",
		14: "News & Magazines",
		15: "Personalization",
		16: "Photography",
		17: "Productivity",
		18: "Shopping",
		19: "Social",
		20: "Sports",
		21: "Tools",
		22: "Transportation",
		23: "Travel & Local",
		24: "Weather",
		25: "Libraries & Demo",
		26: "Arcade",
		27: "Puzzle",
		28: "Cards",
		29: "Casual",
		30: "Racing",
		31: "Sport Games",
		32: "Action",
		33: "Adventure",
		34: "Board",
		35: "Casino",
		36: "Educational",
		37: "Family",
		38: "Live Wallpaper",
		39: "Music Games",
		40: "Role Playing",
		41: "Simulation",
		42: "Strategy",
		43: "Trivia",
		45: "Word Games"
	}
	return out;
})

app.factory( 'ajax', function Services( $http, $q, $cacheFactory ) {
	//preforms all of our ajax calls
	var lru = $cacheFactory( 'lru', {
		capacity: 20
	} );

	function doRequest( path, method, data ) {
		var deferred = $q.defer();

		if ( !data ) {
			data = null;
		}

		$http( {
			method:       method,
			url:          path,
			data:         data,
			timeout:      40000,
			responseType: "json",
			cache:        lru
		} ).success(function ( data ) {
				deferred.resolve( data );
			} ).error( function ( reason ) {
				deferred.reject( reason );
			} );
		return deferred.promise;

	};

	return{
		get:  function ( path ) {
			return doRequest( path, 'JSONP' );
		},
		post: function ( path, data ) {
			return doRequest( path, 'POST', data );
		}
	}
} );

app.factory( 'searchSrv', function ( constants, ajax, $q ) {
	//service that preforms a search based on user provided params
	var baseUrl = "https://42matters.com/api/1/apps/search.json?";

	var lastParams = {
		q:            '',
		access_token: constants.token,
		limit:        '50',
		callback:     'JSON_CALLBACK'
	};

	var out = {
		results:        [],
		number_results: 0,
		page:           1,
		limit:          0,
		num_pages:      1,
		has_next:       false
	};

	//function that wipes old params
	var clearParams = function () {
		lastParams = {
			q:            '',
			access_token: constants.token,
			limit:        '50',
			callback:     'JSON_CALLBACK'
		};
	}

	//wipes old out object
	var clearOut = function () {
		out = {
			results:        [],
			number_results: 0,
			page:           1,
			limit:          0,
			num_pages:      1,
			has_next:       false
		};
	}

	function getData() {
		var paramString = [];
		var currentParams = lastParams;
		//converts spaces in search term to plus operand
		currentParams.q = currentParams.q.replace( ' ', '+' ); //todo: change to a regexp

		//converts obj to array of param strings then into an & delimited string
		angular.forEach( currentParams, function ( value, key ) {
			this.push( key + '=' + value );
		}, paramString );

		paramString = paramString.join( '&' );

		//preform the call
		return ajax.get( baseUrl + paramString ).then( function ( data ) {
			clearOut();
			angular.extend( out, data );
			return out;
		} );

	};

	function staleData() {
		var deferred = $q.defer(); //don't make an ajax call if we already got the data
		deferred.resolve( out );
		return deferred.promise;
	}

	return{
		get:        function ( params ) {
			if ( params && params !== lastParams ) {
				clearParams();
				angular.extend( lastParams, params );
				return getData();
			} else {
				return staleData();
			}
		},
		goToPage:   function ( pageNum ) {
			if ( pageNum && pageNum !== lastParams.page ) {
				lastParams.page = pageNum;
				return getData();
			} else {
				return staleData();
			}
		},
		lastSearch: out //returns the results of the last search call
	};

} );

app.factory( 'searchTop', function ( constants, ajax, $q ) {
	//service that preforms a search based on user provided params
	var baseUrl = "https://42matters.com/api/1/apps/top.json?";

	var lastParams = {
		access_token: constants.token,
		listName:     '',
		category:     '0',
		callback:     'JSON_CALLBACK'
	};

	var out = {
		appList:  [],
		listName: '',
		category: 0
	};

	//function that wipes old params
	var clearParams = function () {
		lastParams = {
			access_token: constants.token,
			listName: '',
			category: '0',
			callback: 'JSON_CALLBACK'
		};
	}

	//wipes old out object
	var clearOut = function () {
		out = {
			appList:  [],
			listName: '',
			category: 0
		};
	}

	function getData() {
		var paramString = [];
		var currentParams = lastParams;

		//converts obj to array of param strings then into an & delimited string
		angular.forEach( currentParams, function ( value, key ) {
			this.push( key + '=' + value );
		}, paramString );

		paramString = paramString.join( '&' );

		//preform the call
		return ajax.get( baseUrl + paramString ).then( function ( data ) {
			clearOut();
			angular.extend( out, data );
			return out;
		} );

	};

	function staleData() {
		var deferred = $q.defer(); //don't make an ajax call if we already got the data
		deferred.resolve( out );
		return deferred.promise;
	}

	return{
		get:        function ( params ) {
			if ( params && params !== lastParams ) {
				clearParams();
				angular.extend( lastParams, params );
				return getData();
			} else {
				return staleData();
			}
		},
		lastSearch: out //returns the results of the last search call
	};

} );
