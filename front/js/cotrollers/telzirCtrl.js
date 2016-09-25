angular.module("telzir").controller("telzirCtrl", function($scope, $http){
	var server = "http://localhost:8080";
	
	var getOrigens = function(){
		$http.get(server+'/origens').success(function(data){
			$scope.origens = data;
		});
	}
	
	var getPlanos = function(){
		$http.get(server+'/planos').success(function(data){
			$scope.planos = data;
		});
	}
	
	$scope.getDestinos = function(origem){
		$http.get(server+'/destinos?origem='+origem).success(function(data){
			$scope.destinos = data;
		});
	}
	
	$scope.consultaTarifacao = function(origem, destino, plano, minutos){
		$http.get(server+'/falemais/consulta?origem='+origem+'&destino='+destino+'&plano='+plano+'&minutos='+minutos).then(function successCallback(response){
			$scope.erroConsulta = undefined;
			$scope.consulta = response.data;
		}, function errorCallback(response){
			$scope.consulta = undefined;
			$scope.erroConsulta = response.data.message;
		});
	}
	
	getOrigens();
	getPlanos();
});
