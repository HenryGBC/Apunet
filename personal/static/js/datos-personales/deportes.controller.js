angular
.module('dPersonales')
.controller('DeportesController', DeportesController);


DeportesController.$inject = ['$scope', '$mdDialog', 'personalService', '$rootScope'];

function DeportesController($scope, $mdDialog, personalService, $rootScope){
    var vm = this;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.limpiar = limpiar;
    vm.deportes = [];
    vm.processing = false;
    vm.loading= true;
    vm.method= 'POST';
    vm.dataDeporte = {};
    vm.showDelete = false;
    vm.selectDeporte = selectDeporte;
    vm.deleteDeporte = deleteDeporte;
    init();

    function init(){
        personalService.getData('deporte-list', vm.id)
        .then(function(res){
            vm.deportes = res;
            vm.loading= false;
        });
    }

    function limpiar(){
        vm.dataDeporte = {};
        vm.anio = '';
        vm.mes = '';
        vm.dia = '';
        vm.method = 'POST';
        vm.showDelete = false;
    }
    function updateDeporte(data){
        var i = 0;
        var index;
        angular.forEach(vm.deportes, function(item){
            if(item.id === data.id){
                index = i;
            }
            i++;
        });
        vm.deportes[index] = data;
    }
    function guardar(){
        if(vm.dataDeporte.evento && vm.dataDeporte.disciplina && vm.dataDeporte.premio){
                vm.processing = true;
                if(vm.method === 'POST'){
                    vm.dataDeporte.personal = vm.id;
                    console.log(vm.dataDeporte);
                    personalService.postData('deporte', vm.dataDeporte)
                    .then(function(res){
                        console.log(res);
                        vm.deportes.unshift(res);
                        vm.processing = false;
                        limpiar();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                }else{
                    console.log(vm.dataDeporte);
                    personalService.putData('deporte-detail', vm.dataDeporte, vm.dataDeporte.id)
                    .then(function(res){
                        updateDeporte(res)
                        vm.processing = false;
                        limpiar();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }
            }
    }
    function selectDeporte(deporte){
        vm.processing = true;
        personalService.getData('deporte-detail', deporte.id)
        .then(function(res){
            vm.dataDeporte = res;
            vm.showDelete = true;
            vm.processing = false;
        });
        vm.method = 'PUT';
    }
    function deleteDeporte(id){
        var i = 0;
        var index;
        vm.processing = true;
        personalService.deleteData('deporte-detail', id)
        .then(function(res){
            angular.forEach(vm.deportes, function(item){
                if(item.id === id){
                    index = i;
                }
                i++;
            });
            vm.processing = false;
            vm.deportes.splice(index, 1);
            limpiar();
        });

    }
    function cancel (){
		$mdDialog.cancel();
	}

}
