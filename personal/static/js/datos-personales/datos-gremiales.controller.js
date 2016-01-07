angular
.module('dPersonales')
.controller('DatosGremialesController', DatosGremialesController);


DatosGremialesController.$inject = ['$scope', '$mdDialog', 'personalService', '$rootScope'];

function DatosGremialesController($scope, $mdDialog, personalService, $rootScope){
    var vm = this;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.limpiar = limpiar;
    vm.cargos = [];
    vm.processing = false;
    vm.loading= true;
    vm.method= 'POST';
    vm.dataCargo = {};
    vm.showDelete = false;
    vm.selectCargo = selectCargo;
    vm.deleteCargo = deleteCargo;
    init();

    function init(){
        personalService.getData('cargo-list', vm.id)
        .then(function(res){
            vm.cargos = res;
            vm.loading= false;
        });
    }

    function limpiar(){
        vm.dataCargo = {};
        vm.anio = '';
        vm.mes = '';
        vm.dia = '';
        vm.method = 'POST';
        vm.showDelete = false;
    }
    function updateCargo(data){
        var i = 0;
        var index;
        angular.forEach(vm.cargos, function(item){
            if(item.id === data.id){
                index = i;
            }
            i++;
        });
        vm.cargos[index] = data;
    }
    function guardar(){
        if(vm.dataCargo.cargo && vm.dataCargo.periodo){
                vm.processing = true;
                if(vm.method === 'POST'){
                    vm.dataCargo.personal = vm.id;
                    console.log(vm.dataCargo);
                    personalService.postData('cargo', vm.dataCargo)
                    .then(function(res){
                        vm.cargos.unshift(res);
                        vm.processing = false;
                        limpiar();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                }else{
                    personalService.putData('cargo-detail', vm.dataCargo, vm.dataCargo.id)
                    .then(function(res){
                        updateCargo(res)
                        vm.processing = false;
                        limpiar();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }
            }
    }
    function selectCargo(cargo){
        vm.processing = true;
        personalService.getData('cargo-detail', cargo.id)
        .then(function(res){
            vm.dataCargo = res;
            vm.showDelete = true;
            vm.processing = false;
        });
        vm.method = 'PUT';
    }
    function deleteCargo(id){
        var i = 0;
        var index;
        vm.processing = true;
        personalService.deleteData('cargo-detail', id)
        .then(function(res){
            angular.forEach(vm.cargos, function(item){
                if(item.id === id){
                    index = i;
                }
                i++;
            });
            vm.processing = false;
            vm.cargos.splice(index, 1);
            limpiar();
        });

    }
    function cancel (){
		$mdDialog.cancel();
	}

}
