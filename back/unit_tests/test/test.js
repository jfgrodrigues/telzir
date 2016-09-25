var assert = require('assert');
var exemplo = require('../lib/exemplo');

var retornoOrigens = [{"origem":"011"},{"origem":"016"},{"origem":"017"},{"origem":"018"}];
var retornoDestino011 = [{"destino":"016"},{"destino":"017"},{"destino":"018"}];
var retornoDestino016 = [{"destino":"011"}];
var retornoDestino017 = [{"destino":"011"}];
var retornoDestino018 = [{"destino":"011"}];
var retornoPlanos = [{"plano":30},{"plano":60},{"plano":120}];
var faleMais11_16_30_20 = {
							"comFaleMais":0,
							"semFaleMais":38
							};
var faleMais11_18_60_80 = {
							"comFaleMais":19.8,
							"semFaleMais":72
							};
var faleMais12_18_60_80 = { 
							"statusCode": 404, 
							"message": "Não há tarifa cadastrada para origem: 012 / destino: 018" 
							};
var faleMais18_16_30_60 = { 
							"statusCode": 404, "message": "Não há tarifa cadastrada para origem: 018 / destino: 016" 
							};
var faleMais11_17_40_50 = {
							"statusCode": 400, "message": "Plano inválido."
							};
var faleMais11_17_30__1 = {
							"statusCode": 400, "message": "O valor do minuto deve ser positivo. O valor enviado (-1), portanto, é inválido"
							};
var faleMaisSemDestino = { 
							"statusCode": 400, "message": "É necessário enviar origem, destino, plano e minutos para fazer a consulta"
							};

it('requisicao origens', function(done) {
	exemplo.reqisicaoOrigens(function(response) {
		assert.deepEqual(retornoOrigens, response);
		done();
	});
});

it('requisicao destinos origem 011', function(done) {
	exemplo.requisicaoDestinos11(function(response) {
		assert.deepEqual(retornoDestino011, response);
		done();
	});
});

it('requisicao destinos origem 016', function(done) {
	exemplo.reqisicaoDestinos16(function(response) {
		assert.deepEqual(retornoDestino016, response);
		done();
	});
});

it('requisicao destinos origem 017', function(done) {
	exemplo.reqisicaoDestinos17(function(response) {
		assert.deepEqual(retornoDestino017, response);
		done();
	});
});

it('requisicao destinos origem 018', function(done) {
	exemplo.reqisicaoDestinos18(function(response) {
		assert.deepEqual(retornoDestino018, response);
		done();
	});
});

it('requisicao planos', function(done) {
	exemplo.requisicaoPlanos(function(response) {
		assert.deepEqual(retornoPlanos, response);
		done();
	});
});

it('requisicao FaleMais mintos dentro do plano', function(done) {
	exemplo.requisicaoFaleMais1(function(response) {
		assert.deepEqual(faleMais11_16_30_20, response);
		done();
	});
});

it('requisicao FaleMais mintos excedendo plano', function(done) {
	exemplo.requisicaoFaleMais2(function(response) {
		assert.deepEqual(faleMais11_18_60_80, response);
		done();
	});
});

it('requisicao FaleMais - erro - origem inexistente', function(done) {
	exemplo.requisicaoFaleMais3(function(response) {
		assert.deepEqual(faleMais12_18_60_80, response);
		done();
	});
});

it('requisicao FaleMais - erro - destino inexistente', function(done) {
	exemplo.requisicaoFaleMais4(function(response) {
		assert.deepEqual(faleMais18_16_30_60, response);
		done();
	});
});

it('requisicao FaleMais - erro - plano inexistente', function(done) {
	exemplo.requisicaoFaleMais5(function(response) {
		assert.deepEqual(faleMais11_17_40_50, response);
		done();
	});
});

it('requisicao FaleMais - erro - minutos negativos', function(done) {
	exemplo.requisicaoFaleMais6(function(response) {
		assert.deepEqual(faleMais11_17_30__1, response);
		done();
	});
});

it('requisicao FaleMais - erro - falta de parametro para a busca', function(done) {
	exemplo.requisicaoFaleMais7(function(response) {
		assert.deepEqual(faleMaisSemDestino, response);
		done();
	});
});