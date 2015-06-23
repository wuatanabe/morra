// Utility to compute a random move (used by robot and by players used for tests)
var utility= (function(){
	var items=['carta','pietra','forbici'];
	return{
			random_move: function(){
				return items[Math.floor(Math.random()* items.length)];
				},
			move_items: items
		}
	})();


module.exports = utility; 