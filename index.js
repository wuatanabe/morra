var express = require('express');
var _ = require('underscore');

var Player = require('./ws/lib/player.js');
var app = express();

var router = require('./config/router.js');
var Match  = require('./ws/lib/match.js');

var utility= require('./ws/lib/morra_utils.js');

var config = require('./config.js');
require('./lib/routes/static').addRoutes(app, config);


app.use('/', router);


var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server listening at http://%s:%s', host, port); 	
});


// move later in a separate file
var io = require('socket.io');
io= io.listen(server);
var players = {};
var robots ={};
var matches ={};
var ids = {};

function playerNames(){
	var names = _.pluck(players, 'name');
	names.push('robot'); //add a robot name to allow to play alone
	return names;
	}	

function getPlayerByName(name){
	return _.find(players, function(p){ return p['name'] == name; });
}

function clean(ws){
	delete players[ws.id];
	delete robots[ws.id];
	delete matches[ids[ws.id]]; //TODO update status for playing players in one has disconnected 
	delete ids[ws.id];	
	}

function logMessage(event_name, data){
	console.log("event_received:", event_name);
	if(data){
		console.log(" with data:", data);
	}
}

function time_out_winner(m){
	console.log('xxxx');
	if(m.player1.latest_move != undefined && m.player2.latest_move != undefined){
		console.log('no winner');
		}else
		{
			if(m.player1.latest_move != undefined){
				console.log('Player 1 wins');
				}else{
					console.log('Player 1 wins');
					}
			
			}
	}

io.on('connection', function(wssocket){
	logMessage('connection', '');
	io.sockets.emit('connect', {});
	
	wssocket.on('setup', function(data){
		logMessage('setup', data);
		console.log(wssocket.id);
		if(getPlayerByName(data.name)==undefined && data.name != 'robot'){
			players[wssocket.id] = new Player(data.name);	
			io.sockets.emit('message', {players_update: playerNames()});
		}else{
			console.log('error');
			io.sockets.emit('setup_auth_error', {name: data.name, reason: 'specified_name_already_taken'});
			}
	});


	wssocket.on('disconnect', function(data){
		logMessage('disconnect', '');
		clean(this);
		io.sockets.emit('message', {players_update: playerNames()});
	});

	wssocket.on('logoff', function(data){
		logMessage('logoff', '');
		clean(this);
		io.sockets.emit('message', {players_update: playerNames()});
	});
	
 
	
	wssocket.on('challenge', function(data){
		logMessage('challenge', data);
		var challenger=  data['challenger'];
		var challenged= data['challenged'];
		var id= Date.now()+'_'+ challenger +'_vs_'+ challenged;
		var player1 = getPlayerByName(challenger);
		var use_robot = (challenged === 'robot');  
	  	if(use_robot){
			// avoid to create a new robot if one already available
			if(robots[wssocket.id] && robots[wssocket.id] != undefined){
					var player2 = robots[wssocket.id];
				}else{
					var player2 = new Player(id);
					robots[wssocket.id] = player2;
					}
		}else{
			var player2 = getPlayerByName(challenged);
		}
		matches[id] = new Match(player1, player2, 3, use_robot, id);
		ids[wssocket.id] = id; //TODO: Check if already present
		var message = {id: id, challenger: challenger, challenged: challenged};
		io.sockets.emit('start', message);
		//setInterval(time_out_winner(matches[id]),  1*1*1000);   
	});



	wssocket.on('move', function(data){
		logMessage('move', data);
		var id = data['id']; 
		var m = matches[id];
		var mv = data['move'];
		var challenger = data['challenger'];
		var challenged = data['challenged'];
		var from = data['from'];

		if(from === challenger){
			m.player1.latest_move = m.player1.move(mv);
		};

		if(from === challenged){
			m.player2.latest_move = m.player2.move(mv);
		};

		if(m.player1.latest_move != undefined && m.player2.latest_move === undefined && m.use_robot === true && m.is_over === false){
			m.player2.latest_move= m.player2.move(utility.random_move());
		};


		if(m.player1.latest_move != undefined && m.player2.latest_move != undefined){
			m.compute_set_result(m.player1.latest_move, m.player2.latest_move);
			if(m.is_over){
				if(m.final_result==0){
					m.player1.update_statistics('won');
					m.player2.update_statistics('lost');
					}
					else{
						m.player1.update_statistics('lost');
						m.player2.update_statistics('won');						
					}
				var message = {status: 'idle', finalresult: m.final_result, partialresult: m.set_won, move1: m.player1.latest_move, move2: m.player2.latest_move, challenged: challenged, challlenger: challenger, id: id};
				io.sockets.emit("partialresult", message);	
				io.sockets.emit("finalresult",message);		
			}else{
				var message = {status: 'playing', partialresult: m.set_won, move1: m.player1.latest_move, move2: m.player2.latest_move, challenged: challenged, challenger: challenger, id: id};
				io.sockets.emit("partialresult", message);	
			}	
			m.reset_players_latest_move();		
		}
	});


});

