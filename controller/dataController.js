//Require, indica onde possui mais dados sobre configuração
var db = require('../db_config.js');

//Listar todos os serviços disponíveis que estão no banco de dados
exports.list = function(callback){
	db.Data.find({}, function(error, data) {
		if(error) {
			callback({error: 'Não foi possivel retornar os serviços cadastrados.'});
		} else {
			callback(data);
		}
	});
};

//Listar determinado serviço através do ID informado
exports.searchID = function(id, callback){
	db.Data.findById({_id: id}, function(error, data) {
		if(error) {
			callback({error: 'Não há serviço para tal ID.'});
		} else {
			callback(data);
		}
	});
};

//Lista os todos os serviços de acordo com o tipo pedido
exports.searchService = function(service, callback){
	db.Data.find({'service': service}, function(error, data) {
		if(error) {
			callback({error: 'Error.'});
		} else {
			callback(data);
		}
	});
};

//Salva o que vocês fez no POST no banco de dados
exports.save = function(service, ip, link, callback){
	new db.Data({
		'service': service,
		'ip': ip,
		'link': link,
		'created_at': new Date()
	}).save(function(error, data) {
		if(error) {
			callback({error: 'Não foi possivel salvar o serviço.'});
		} else {
			callback(data);
		}
	});
};
