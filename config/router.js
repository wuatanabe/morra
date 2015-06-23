var express = require('express');
var router = require('express').Router();
var path =require('path');
var util = require('util');

router.use(function timeLog(req, resp, next){
  console.log('INFO:::  %s  ::: request %s', Date.now());
  console.log(req);
  next();	
})

router.get('/', function(req, res) {
	var path_to_index_file = path.join(__dirname, '../', 'index.html');
	console.log(path_to_index_file);
        res.sendFile(path_to_index_file); // load the single view file (angular will handle the page changes on the front-end)
	});

module.exports = router;