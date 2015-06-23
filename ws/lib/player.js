// Class for Player Objects

var Player = function(name){
	this.status = 'idle';
	this.name = name;
	this.latest_move = undefined;
	this.statistics = {
		'won': 0,
		'lost': 0,
		'played': 0
	};
	
	
	
	this.reset_latest_move= function(){
		this.latest_move= undefined;
	}

	
	this.move= function(item){
		if(this.status == 'idle'){
			this.status= 'playing';
			this.statistics['played']+= 1;
		}
		console.log('Info :: Player\t[%s]\thas moved:\t[%s].', this.name, item);
		return item;
		};

	this.update_statistics = function(finalresult){
		if(finalresult == 'won'){
			this.statistics['won']+= 1;
		}else{
			this.statistics['lost']+= 1;
		}
		this.status= 'idle';
		console.log('Info :: Player\t[%s] - Total Matches Won: %s', this.name, this.statistics['won']);
		console.log(this.statistics);
		return this;
	}

};

//var p= new Player('paolo');
//console.log(p);

module.exports = Player;