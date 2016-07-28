//Informações para conexão do banco de dados
var db_string		= 'mongodb://127.0.0.1/mongodatabase1';
var mongoose 		= require('mongoose').connect(db_string);
var db 				= mongoose.connection;
var autoIncrement 	= require('mongoose-auto-increment'); //module de autoincrement pro mongoose
autoIncrement.initialize(mongoose);

//Caso o banco de dados dê algum erro:
db.on('error', console.error.bind(console, 'Erro ao conectar-se ao banco de dados.'));

//Abrir banco de dados para adicionar os dados (?)
db.once('open', function() {
	var userSchema = mongoose.Schema({
		service: String,
		ip: String,
		link: String,
		created_at: Date
	});

	userSchema.plugin(autoIncrement.plugin, 'Data');
	exports.Data = mongoose.model('Data', userSchema);
});

