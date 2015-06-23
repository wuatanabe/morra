var Player = require('../ws/lib/player.js'),
	Match = require('../ws/lib/match.js'),
	assert = require('assert'),
	io = require('socket.io-client'),
	rndmv=require('../ws/lib/morra_utils.js'),
	sleep = require('thread-sleep');


var items= ['carta', 'pietra', 'forbici'];
var url= 'http://localhost:3000';
var name_c1= 'simulationOfRealPlayer';

var ClientFactory = require('../ws/test_client/morraclient.js') ;



describe('Server', function(){
	
// TO BE COMPLETED
	describe('# ws_connection', function(){
	    it('should return ', function(){
		var c1= new ClientFactory(url, name_c1);    
		
	    })
	  })

	  
	describe('# ws_disconnect', function(){
	    it('should return ', function(){	
	    })
	  })

	describe('# ws_logoff', function(){
	    it('should return ', function(){	
	    })
	  })

	describe('# ws_challenge', function(){
	    it('should return ', function(){	
	    })
	  })
	  
	describe('# ws_move', function(){
	    it('should return ', function(){	
	    })
	  })
	  
	    
})