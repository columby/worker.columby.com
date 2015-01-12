/* here we go */

// modules
var kue = require('kue'),
	  request = require('request');

// workers
var arcgis = require('./workers/arcgis.js');

// processors
var jobs = kue.createQueue();


jobs.process("arcgis",function(job,done){
	arcgis(job,done)
});


function arcgis(job,done){

	var ID = job.data.ID;

	request('http://188.166.31.214:8000/api/v2/dataset/'+ID, function(error,response,body) {
        if(error) done("error getting dataset (id: "+ID+") info");
        if(!error && response.statusCode == 200){
        	var data = JSON.parse(body);
        	// start arcgis scraper
        	arcgis.go(job,data,done);
        }
    });

}

console.log("\033[34mkue started... \033[0m");

kue.app.set('title', 'Columby Worker // kue');

kue.app.listen(process.env.COLUMBY_WORKER_PORT || 7000);
