var Sequelize = require('sequelize')
  , sequelize = new Sequelize('lawyer_scoreboard', 'root', null, {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
     
    })
 
var Lawyer = sequelize.define("Lawyer",{
	name: Sequelize.STRING,
	location: Sequelize.STRING,
	record: Sequelize.STRING,
	rate: Sequelize.DECIMAL,
	test: Sequelize.STRING
}); 

sequelize.sync();

var express = require('express');
var http = require('http');
var app = express();
app.set('port', process.env.PORT || 1337);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
    next();
  })
});

app.get('/lawyer', function(req,res){
	res.setHeader('content-type','application/json');
	Lawyer.all().success(function(lawyers) {
	res.send(lawyers);
  // lawyers will be an array of all Lawyer instances
})
});


app.listen(1337);