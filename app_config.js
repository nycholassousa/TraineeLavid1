//Requires e modules
var express 	= require('express');
var app 		= module.exports = express();
var bodyParser 	= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.listen(5000, function () {
	console.log("Listening to PORT 5000"); //Informação no Console, removendo um GET desnecessário
});
