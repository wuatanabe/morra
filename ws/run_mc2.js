
var ClientFactory = require('./test_client/morraclient.js') 

var url= 'http://localhost:3000';
var name_c1= 'joh';
var c1= new ClientFactory(url, name_c1);
c1.emit('setup', { name: name_c1 });

 

//c1.emit('challenge', {challenger: name_c1, challenged: 'robot'});

//c1.emit('challenge', {challenger: name_c1, challenged: name_c2});