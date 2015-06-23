var move_items=['carta','pietra','forbici'];

var random_move = function(move_items){
	return move_items[Math.floor(Math.random()* move_items.length)];
}

//var r = random_move(items);
//console.log(r);


module.exports = random_move;