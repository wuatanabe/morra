var Player = require('../ws/lib/player.js');
var assert = require('assert');

var p = new Player("player_name")

describe('Player', function(){
  
	describe('#new Player(player_name)', function(){
	    it('should return ', function(){	
		assert.equal("player_name", p.name);
		assert.equal(undefined, p.latest_move);
		assert.equal(0, p.statistics.lost);
		assert.equal("idle", p.status); 
	    })
	  })

	  
	describe('#reset_latest_move)', function(){
	    it('should return ', function(){	
		assert.equal(undefined, p.reset_latest_move()); 
	    })
	  })
	  
	  
	describe('#move(item)', function(){
	    var item="forbici";
	    it('should return ', function(){	
		assert.equal(item, p.move(item)); 
		assert.equal("playing", p.status); 
	    })
	  })
	  
	  
	  describe('#update_statistics()', function(){
	    it('should return ', function(){	
		p.update_statistics('won');
		assert.equal(1, p.statistics.won); 
		p.update_statistics('won');
		assert.equal(2, p.statistics.won); 
		p.update_statistics('lost');
		assert.equal(1, p.statistics.lost); 
		assert.equal("idle", p.status); 
	    })
	  })
  
  
})