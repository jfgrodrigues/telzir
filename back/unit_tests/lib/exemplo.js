var http = require('http');

exports.reqisicaoOrigens = function(callback) {
	http.request('http://localhost:8080/origens', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoDestinos11 = function(callback) {
	http.request('http://localhost:8080/destinos?origem=011', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.reqisicaoDestinos16 = function(callback) {
	http.request('http://localhost:8080/destinos?origem=016', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.reqisicaoDestinos17 = function(callback) {
	http.request('http://localhost:8080/destinos?origem=017', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.reqisicaoDestinos18 = function(callback) {
	http.request('http://localhost:8080/destinos?origem=018', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoPlanos = function(callback) {
	http.request('http://localhost:8080/planos', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais1 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=011&destino=016&plano=30&minutos=20', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais2 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=011&destino=018&plano=60&minutos=80', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais3 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=012&destino=018&plano=60&minutos=80', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais4 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=018&destino=016&plano=30&minutos=60', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais5 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=011&destino=017&plano=40&minutos=50', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais6 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=011&destino=017&plano=30&minutos=-1', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}

exports.requisicaoFaleMais7 = function(callback) {
	http.request('http://localhost:8080/falemais/consulta?origem=011&plano=30&minutos=20', function(response) {
		var stringResposta = '';

		response.on('data', function(data) {
			stringResposta += data;
			
		});

		response.on('end', function() {
			callback(JSON.parse(stringResposta));
			
		});
	}).end();
}