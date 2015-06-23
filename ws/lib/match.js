// Class for Match Objects
// keep references to:
// - Player involved in the match 
// - Current status/result of the match

var Match=  function(player1, player2, target, use_robot, id){
    this.id = id;
    this.use_robot = use_robot;
    this.player1 = player1;
    this.player2 = player2;
    this.moves_p1 = [];
    this.moves_p2 = [];
    this.set_won = [0,0];
    this.target = target; 
    this.final_result = undefined;
    this.is_over = false;
 
	
    this.compute_set_result= function(move_by_p1, move_by_p2){
    	this.moves_p1.push(move_by_p1);
    	this.moves_p2.push(move_by_p2);
    	this.set_won = rule(move_by_p1, move_by_p2, this.set_won);
    	this.finished();
    };

    this.reset_players_latest_move= function(){
        this.player2.reset_latest_move();
        this.player1.reset_latest_move();
    }
    
    this.finished= function(){
        console.log('Match :: Info :: Target to win:', this.target);
        console.log('Match :: Info :: Set:', this.set_won);
    	if(this.set_won[0] == this.target){
    		this.is_over = true;
    		this.final_result = 0;
    		return};
        if(this.set_won[1] == this.target){
    		this.is_over = true;
    		this.final_result=1;
    		return};
    	return;	
    }
};


// Rule to compute the winner on each move 
function rule(m1, m2, acc){
	
	if(m1 == m2){
		return acc;
	};
 	
	if((m1 == 'carta' && m2 == 'pietra') || (m1== 'pietra' && m2 == 'forbici') || (m1 == 'forbici' && m2 == 'carta')) {
		acc[0] += 1;
		return acc;
 	};
        
	console.log(acc);
 	acc[1] += 1;
 	return acc;
};


//var m= new Match("p1", "p2", 3, true);
//m.compute_set_result('carta', 'pietra');
//m.compute_set_result('carta', 'pietra');
//m.compute_set_result('carta', 'pietra');
//console.log(m);


module.exports = Match;