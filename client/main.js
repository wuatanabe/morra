"use strict";

// Utilities
var move_items=['carta','pietra','forbici'];
var random_move = function(move_items){
	return move_items[Math.floor(Math.random()* move_items.length)];
}

// App
var app = angular.module('app', []);

// Views
var views = angular.module('views', []);

//WebSocket
var mainApp = angular.module('mainApp', ['ngCookies', 'ngRoute','btford.socket-io', 'app','views'])
.factory('WSCLIENT', function (socketFactory) {
  return socketFactory();
});

//Router Config
mainApp.config(function($routeProvider, $locationProvider){
	$routeProvider.
		when('/signup', {templateUrl: '/partials/signup.html', controller: 'SignupCtrl'}).
		when('/setup', {templateUrl: '/partials/setup.html', controller: 'SetupCtrl'}).
		when('/play',{templateUrl: '/partials/play.html',controller: 'PlayCtrl'});
});


//Controllers
app.controller('MainController', function($location, $cookieStore, $log, $scope, WSCLIENT) {
		$scope.name='';
		WSCLIENT.on('message',  function(data){
			$log.debug('message:');
			$log.debug('data:', data);
			$cookieStore.players= data.players_update;
			$log.debug('data_players:', data.players_update);
			$log.debug('cookies_players:', $cookieStore.players);	
			});

		WSCLIENT.on('setup_auth_error',  function(data){
			$log.debug('setup_auth_error:');
			$log.debug('data:', data);
			if(data.name == $cookieStore.username){
				$scope.logoff();
				$scope.error= data;
				var error_message="Auth Error: "+$scope.error.reason;
				alert(error_message); 
				$location.path('/signup');
				}
			});
			
		WSCLIENT.on('start', function(data){
			var chllngr = data['challenger'];
			var chllngd = data['challenged'];
			$log.debug('<start> received with data:');
			$log.debug(data);
			if(chllngr == $cookieStore.username || chllngd == $cookieStore.username){
				$cookieStore.challenger= chllngr;
				$cookieStore.challenged= chllngd;
				$cookieStore.id= data['id'];
				$cookieStore.partialresults= [];
				$cookieStore.finalresults= undefined;
				if($cookieStore.username== $cookieStore.challenger){
					$cookieStore.opponent = $cookieStore.challenged;
				}else{
					$cookieStore.opponent = $cookieStore.challenger;
					}
				$location.path('/play');
			}
			
		});


		WSCLIENT.on('partialresult', function(data){
			$log.debug('<partialresult> received with data:');
			$log.debug(data);
			$cookieStore.partialresults.push(data);
			$log.debug('$cookieStore.partialresults:',$cookieStore.partialresults );
		});		
		

		WSCLIENT.on('finalresult', function(data){
			$log.debug('<finalresult> received with data:');
			$log.debug(data);
			$cookieStore.partialresults.push(data);
			$cookieStore.finalresult = data;
			$log.debug('$cookieStore.partialresults:',$cookieStore.partialresults );
			var winner=[$cookieStore.challenger, $cookieStore.challenged];
			var winner_declaration = "Winner is: "+winner[$cookieStore.finalresult.finalresult];
			$log.debug(winner_declaration);
			alert(winner_declaration);
			$location.path('/setup');
		});		
	$scope.signaction="SignUp";	
	$scope.text = "Welcome into the Game!";
	$scope.signedup= false;

	$scope.logoff= function logoff(){
		if($scope.signaction=="SignOff")
			$scope.signaction="SignUp";
			$scope.signedup= false;
			if($scope.developers){
							var index = $scope.developers.indexOf($cookieStore.username);
							if(index != -1) {
										$scope.developers.splice(index, 1);
										}
			}
			WSCLIENT.emit('logoff', {name: $cookieStore.username});
		};
		
	$scope.ngswitch= function ngswitch(){
					$scope.signedup= true;
					$scope.signaction="SignOff";
		}
	
		$scope.signup = function signup(){
			$scope.ngswitch();
		}		
});



views.controller('SignupCtrl', function($location, $cookieStore, $scope, $log, WSCLIENT) {
    $scope.submitForm = function submitForm() {
	    $scope.signup();
	    $cookieStore.username= $scope.name
	    WSCLIENT.emit('setup', { name: $scope.name});
	    $location.path('/setup'); 		
  };
});


views.controller('SetupCtrl', function($scope, $cookieStore, $log, WSCLIENT) {
		$scope.error="";
		$log.debug('$cookie_players',$cookieStore.players);
		if($cookieStore.players){
			var index = $cookieStore.players.indexOf($cookieStore.username);
			if(index != -1) {
				$cookieStore.players.splice(index, 1);
			}
			$scope.developers = $cookieStore.players;
			$scope.opponent = $cookieStore.opponent;
		}
		$scope.challenge = function challenge(dev) {
			$log.debug('challenged:', dev);
			$log.debug('challenger:', $cookieStore.username);
			WSCLIENT.emit('challenge', {challenger: $cookieStore.username , challenged: dev});
		};
});


views.controller('PlayCtrl', function($scope, $cookieStore, $log, WSCLIENT) {
	$scope.name=$cookieStore.username;
	$scope.challenged= $cookieStore.challenged;  
	$scope.opponent= $cookieStore.opponent;  
	$scope.partialresults=  $cookieStore.partialresults;
	$scope.move = function(item){
			var message = {'move': item, 'from':  $cookieStore.username, 'id': $cookieStore.id, 'challenger': $cookieStore.challenger, 'challenged': $cookieStore.challenged};
			$log.debug('move with message:', message);
			WSCLIENT.emit('move',message);
		}
});

