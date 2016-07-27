//Pronto:
//Inserindo arquivo junto com os dados - ver o motivo de mesmo dando erro, o arquivo é enviado
//ID gerado automaticamente e incrementado
//Pegando o IP da máquna que está enviando o arquivo
//GET retornando um ID específico
//Inserir o caminho da url -- Está sendo o nome do arquivo, alterar depois

/** TODO **/
// Falta fazer o nome do arquivo ser o ID e inserir o formato

var app 			= require('./app_config.js');
var dataController 	= require('./controller/dataController.js');
var util 			= require('util');
var multer  		= require('multer');

//Configurações para o multer
//Observações sobre
var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname); //Pegando nome original, junto com a extensão
	}
});
var upload = multer({ storage : storage }).array('file',2);

//GET - Retornar todos os serviços do Banco de Dados
app.get('/request', function(req, res) {

	dataController.list(function(resp) {
		res.json(resp);
	});

});

//GET - Retorna um ID específico
app.get('/request/:id', function(req, res) {
	
	var id = req.params.id;
	dataController.searchID(id, function(resp) {
		res.json(resp);
	});

});

//GET - Retorna uma lista de serviços específicos
app.get('/services/:service', function(req, res) {

	var service = req.params.service;
	dataController.searchService(service, function(resp) {
		res.json(resp);
	});

});

//POST - Adicionando um novo serviço no Banco de Dados
app.post('/', upload, function(req, res) {

	var service = req.body.service;
	var link = req.protocol + '://' + req.get('host') + req.originalUrl + 'uploads/' + req.files[0].originalname;

	if (req.body.service == 'audio' || req.body.service == 'legenda' || req.body.service == 'video'){
		//console.log(req.body);
		//console.log(req.files);
		dataController.save(service, link, function(resp) {
			res.status(200).json(resp);
		});
	} else {
		res.status(200).json("Serviço Inválido");
	}

});