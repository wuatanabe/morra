var io = require('socket.io-client'),
      rndmv=require('./morra_utils.js');
var items= ['carta', 'pietra', 'forbici'];


var ClientFactory = function(url, client_name) {
	var _this= this;
	_this.name=client_name;
	_this.socket = io.connect(url);
	_this.connected= false;
	_this.socket.on('connect', function () { 
		console.log("*************** <connect>"); 
		_this.connected=true;
		console.log(this.connected);
	});

	_this.socket.on('message', function(data){ 
		console.log('<message>:', data); 
	});


	_this.socket.on('accepted', function(data){ 
		console.log('<accepted>:', data); 
	});


	_this.socket.on('challenged', function(data){
		console.log('<challenged>'); 
		if(data['challenged'] ===name){
			console.log('<challenged> received with data:', data);
			_this.socket.emit('accepted', data);
		}		
	});


	_this.socket.on('start', function(data){
		var chllngr = data['challenger'];
		var chllngd = data['challenged'];
		console.log('<start> received with data: %s', data);
		if(chllngr === _this.name || chllngd === _this.name){
			var id = data['id'];
			var rm = rndmv(items);
			var message = {'move': rm, 'from':   _this.name, 'id': id, 'challenger': chllngr, 'challenged': chllngd};
			_this.socket.emit('move',message);
		}
	});


	_this.socket.on('partialresult', function(data){
		console.log('<partialresult> received with data:');
		console.log(data);
		_this.socket.emit('move',{'move': rndmv(items), 'from':  _this.name, 'id': data['id'], 'challenger': data['challenger'], 'challenged': data['challenged']});
	});

	_this.socket.on('finalresult', function(data){
		console.log('<finalresult> received with data:');
		console.log(data);
	});


	return _this.socket;
}
 	
module.exports = ClientFactory;