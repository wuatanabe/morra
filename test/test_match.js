var Player = require('../ws/lib/player.js');
var Match = require('../ws/lib/match.js');
var assert = require('assert');


var player1 = new Player("player1");
var player2 = new Player("player2");
var robot = new Player("robot");


describe('Match', function(){
  

	describe('#new Match(..) with a player and a robot as opponent', function(){
	   var match = new Match(player1, robot, 3, true, 0);
	    it('should return ', function(){	
		assert.equal(0, match.id);
		assert.equal(true, match.use_robot);
		assert.equal(player1, match.player1);
		assert.equal(robot, match.player2);
		//assert.equal([], match.moves_p1);
		//	assert.equal([], match.moves_p1); 	    
		assert.equal(robot, match.player2);
		//assert.equal([0,0], match.set_won);
		assert.equal(3, match.target); 		    
		assert.equal(false, match.is_over); 	   
	    })
	  })
	  
	  
	describe('#compute_set_result ', function(){
	   var match = new Match(player1, robot, 3, true, 0);
	   it('should return ', function(){	
		match.compute_set_result('forbici', 'pietra');   
		assert.equal(false, match.is_over);
		match.compute_set_result('forbici', 'pietra');   
		match.compute_set_result('forbici', 'pietra');   
		assert.equal(true, match.is_over);	   
	    })
	  })
	  
	  
	describe('#reset_players_latest_move ', function(){
	   var match = new Match(player1, robot, 3, true, 0);
	   match.reset_players_latest_move();   
	   it('should return ', function(){	
		assert.equal(undefined, match.player1.latest_move);
		assert.equal(undefined, match.player2.latest_move);
	    })
	  })  
	   
    
})	