'use strict';

angular.module( 'appSearchApp' )
	.filter( 'price', function () {
		return function ( input ) {
			if ( input === 0 || !input ) {
				return "Free"
			} else {
				return '$' + input;
			}
		};
	} )
	.filter( 'priceLabel', function () {
		return function ( input ) {
			if ( input === 0 || !input ) {
				return "label-success"
			} else {
				return "label-primary"
			}
		}
	} )
	.filter( 'category', function (categoryServ) {
		return function ( input ) {
			return categoryServ[input];
		}
	} )
	.filter( 'iapIcon', function(){
		return function(input){
			if(input){
				return "glyphicon-ok-sign"
			}else{
				return "glyphicon-remove-sign"
			}
		}
	})