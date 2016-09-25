var express = require('express')
	,app = express();
var MongoClient = require('mongodb').MongoClient
	,assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
	
var port = 8080;
var hora = new Date();

var url = 'mongodb://localhost:27017/telzir';


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/falemais/consulta', function(req, res){
	var origem = req.query.origem;
	var destino = req.query.destino;
	var minutos = parseInt(req.query.minutos);
	var plano = parseInt(req.query.plano);
	var query = { $and: [{ origem: origem }, { destino: destino }] };
	var field = { tarifa:1 };
	var planosValidos = [30, 60, 120];
	var validaReqEntrada = function(){
		var verificacao = new Array();
		for (var i = 0, j = arguments.length; i < j; i++) {
			if(!isNaN(arguments[i]) && arguments[i]!=""){
				verificacao[i]=true;
			} else { 
				return false;
			}
		}
		return true;
	}
	
	var error = function(message, statusCode){
		var resposta = '{ "statusCode": '+statusCode+', "message": "'+message+'" }';
		res.statusCode = statusCode;
		res.send(resposta);
		res.end();
	}
	
	var findDocuments = function(db, callback) {
		var collection = db.collection('tarifas');
		collection.find(query, field).toArray(function(err, docs) {
			assert.equal(err, null);
			if(docs!=''){
				var objTarifa = docs[0];
				var tarifa = objTarifa.tarifa;
				var comPlano = comFaleMais(minutos, plano, tarifa);
				var semPlano = semFaleMais(minutos, tarifa);
				console.log('com plano: '+comPlano);
				console.log('sem plano: '+semPlano);
				var resposta = { 
									"comFaleMais": comPlano, 
									"semFaleMais": semPlano 
								};
				res.send(resposta);
			} else {
				error('Não há tarifa cadastrada para origem: '+origem+' / destino: '+destino, 404);
			}
			callback(docs);
		});
	}

	var comFaleMais = function(minutos, plano, tarifa){
		var tarifacao;
		if (minutos > plano) {
			var minutosExcedentes = minutos - plano;
			var tarifacao = minutosExcedentes*tarifa*1.1;
		} else {
			tarifacao = 0;
		}
		return tarifacao;
	}

	var semFaleMais = function(minutos, tarifa){
		var tarifacao = minutos*tarifa;
		return tarifacao;
	}
	
	var validaPlano = function(plano){
		for(i = 0; i < planosValidos.length; i++){
			if(plano == planosValidos[i]){
				return true;
			}
		}
		return false;
	}
	
	if(minutos>0){ 
		if(validaReqEntrada(origem, destino, minutos, plano)){
			if(validaPlano(plano)){
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);
					findDocuments(db, function() {
						db.close();
					});
				});
			} else {
				error('Plano inválido.', 400);
			}
		} else {
			error('É necessário enviar origem, destino, plano e minutos para fazer a consulta', 400);
		}
	} else {
		error('O valor do minuto deve ser positivo. O valor enviado ('+minutos+'), portanto, é inválido', 400);
	}
});

app.get('/origens', function(req, res){
	var field = { origem: 1, _id: 0 };

	var findDocuments = function(db, callback) {
		var collection = db.collection('tarifas');
		collection.find({}, field).toArray(function(err, docs) {
			assert.equal(err, null);
			console.dir(docs);
			var array = docs;
			var arrTmp = [];
			
			for(i=0; i < array.length; i++){
				arrTmp.push(array[i].origem);
			}
			
			var arrayResposta = arrTmp.filter(function(este, i) {
				return arrTmp.indexOf(este) == i;
			});
			
			for(i=0; i < arrayResposta.length; i++){
				var json = {
								"origem": arrayResposta[i]
							};
				arrayResposta[i] = json;
			}
			res.send(arrayResposta);
			callback(docs);
		});
	}

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findDocuments(db, function() {
			db.close();
		});
	});
});

app.get('/destinos', function(req, res){
	var query = { origem: req.query.origem };
	var field = { destino: 1, _id: 0 };
	
	var findDocuments = function(db, callback) {
		var collection = db.collection('tarifas');
		collection.find(query, field).toArray(function(err, docs) {
			assert.equal(err, null);
			console.dir(docs);
			res.send(docs);
			callback(docs);
		});
	}

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findDocuments(db, function() {
			db.close();
		});
	});
	
});

app.get('/planos', function(req, res){
	var field = { plano: 1, _id: 0 };

	var findDocuments = function(db, callback) {
		var collection = db.collection('planos');
		collection.find({}, field).toArray(function(err, docs) {
			assert.equal(err, null);
			console.dir(docs);
			res.send(docs);
			callback(docs);
		});
	}

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findDocuments(db, function() {
			db.close();
		});
	});
});

app.listen(port, function(){
	console.log('Servidor rodando na porta '+port+' \nInicializado: '+hora);
});