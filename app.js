var app 			= require('./app_config.js');
var dataController 	= require('./controller/dataController.js');
var util 			= require('util');
var multer  		= require('multer');

//Configurações para o multer
var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		//console.log(file.mimetype);
		callback(null, Date.now() + '-' + file.originalname); 
	}
});
var upload = multer({ storage : storage }).single('file');

//GET - Retornar todos os serviços do Banco de Dados
app.get('/request', function(req, res) {

	dataController.list(function(resp) {
		res.status(200).json(resp);
	});

});

//GET - Retorna um ID específico
app.get('/request/:id', function(req, res) {
	
	var id = req.params.id;
	dataController.searchID(id, function(resp) {
		res.status(200).json(resp);
	});

});

//GET - Retorna uma lista de serviços específicos
app.get('/services/:service', function(req, res) {

	var service = req.params.service;
	dataController.searchService(service, function(resp) {
		res.status(200).json(resp);
	});

});

//POST - Adicionando um novo serviço no Banco de Dados
app.post('/', upload, function(req, res) {
		
	var ipaux = req.connection.remoteAddress; //IP auxiliar pra ajudar
	if (ipaux.length >= 15) 
		ipaux = ipaux.slice(7); //Pegando apenas a parte do ipv4
	if (ipaux == '::1')
		ipaux = '127.0.0.1'; //Apenas pra ficar bonito, nao exibir ::1

	//console.log(ipaux);

	var service = req.body.service;
	var ip = ipaux;
	var link = req.protocol + '://' + req.get('host') + req.originalUrl + 'uploads/' + req.file.filename;

	if (service.toLowerCase() == 'audio' || service.toLowerCase() == 'legenda' || service.toLowerCase() == 'video'){
		dataController.save(service, ip, link, function(resp) {
			res.status(200).json(resp);
		});
	} else {
		res.status(200).json("Serviço Inválido");
	}

});