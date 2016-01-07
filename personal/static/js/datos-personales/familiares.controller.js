angular
.module('dPersonales')
.controller('FamiliarController', FamiliarController);


FamiliarController.$inject = ['$scope', '$mdDialog', 'personalService', '$rootScope'];

function FamiliarController($scope, $mdDialog, personalService, $rootScope){
    var vm = this;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.limpiar = limpiar;
    vm.familiares = [];
    vm.processing = false;
    vm.loading= true;
    vm.loadingFamiliar= true;
    vm.method= 'POST';
    vm.dataFamiliar = {};
    vm.showDelete = false;
    vm.selectFamiliar = selectFamiliar;
    vm.deleteFamiliar = deleteFamiliar;
    vm.anios = [];
    vm.dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    vm.meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    init();

    function init(){
        for (var i = 1910; i<2015; i++ ){
            vm.anios.push(i);
        }
        for (var i = 11; i<=31; i++ ){
            vm.dias.push(i);
        }
        personalService.getData('familiar-list', vm.id)
        .then(function(res){
            vm.familiares = res;
            vm.loading= false;
            vm.loadingFamiliar = false;
        });
    }

    function limpiar(){
        vm.dataFamiliar = {};
        vm.anio = '';
        vm.mes = '';
        vm.dia = '';
        vm.method = 'POST';
        vm.showDelete = false;
    }
    function updateFamiliar(data){
        var i = 0;
        var index;
        angular.forEach(vm.familiares, function(item){
            if(item.id === data.id){
                index = i;
            }
            i++;
        });
        vm.familiares[index] = data;
    }
    function guardar(){
        if(vm.dataFamiliar.parentesco && vm.dataFamiliar.carnet &&
            vm.dataFamiliar.cedula && vm.dataFamiliar.nombres && vm.dataFamiliar.apellidos &&
            vm.dataFamiliar.edad && vm.anio & vm.mes && vm.dia && vm.dataFamiliar.telefono){
                vm.dataFamiliar.fecha_nacimiento = vm.anio+'-'+vm.mes+'-'+vm.dia;
                vm.processing = true;
                if(vm.method === 'POST'){
                    if(!vm.dataFamiliar.trabajador_unet){
                        vm.dataFamiliar.trabajador_unet = false;
                    }
                    if(!vm.dataFamiliar.ayuda_academica){
                        vm.dataFamiliar.ayuda_academica = false;
                    }
                    vm.dataFamiliar.personal = vm.id;
                    console.log(vm.dataFamiliar);
                    personalService.postData('familiar', vm.dataFamiliar)
                    .then(function(res){
                        vm.familiares.unshift(res);
                        vm.processing = false;
                        limpiar();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                }else{
                    console.log(vm.dataFamiliar);
                    personalService.putData('familiar-detail', vm.dataFamiliar, vm.dataFamiliar.id)
                    .then(function(res){
                        updateFamiliar(res)
                        vm.processing = false;
                        limpiar();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }
            }
    }
    function selectFamiliar(familiar){
        vm.processing = true;
        personalService.getData('familiar-detail', familiar.id)
        .then(function(res){
            vm.dataFamiliar = res;
            vm.anio = vm.dataFamiliar.fecha_nacimiento.split('-')[0];
            vm.mes = vm.dataFamiliar.fecha_nacimiento.split('-')[1];
            vm.dia = vm.dataFamiliar.fecha_nacimiento.split('-')[2];
            if(!vm.dataFamiliar.trabajador_unet){
                vm.dataFamiliar.trabajador_unet = false;
            }
            if(!vm.dataFamiliar.ayuda_academica ){
                vm.dataFamiliar.ayuda_academica = false;
            }
            vm.showDelete = true;
            vm.processing = false;
        });
        vm.method = 'PUT';
    }
    function deleteFamiliar(id){
        var i = 0;
        var index;
        vm.processing = true;
        personalService.deleteData('familiar-detail', id)
        .then(function(res){
            angular.forEach(vm.familiares, function(item){
                if(item.id === id){
                    index = i;
                }
                i++;
            });
            vm.processing = false;
            vm.familiares.splice(index, 1);
            limpiar();
        });

    }
    function cancel (){
		$mdDialog.cancel();
	}

}
