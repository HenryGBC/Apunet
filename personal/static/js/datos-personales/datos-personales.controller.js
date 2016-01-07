angular
.module('dPersonales')
.controller('DatosPersonalesController', DatosPersonalesController);


DatosPersonalesController.$inject = ['$scope', '$mdDialog', 'personalService', '$rootScope'];

function DatosPersonalesController($scope, $mdDialog, personalService, $rootScope){
    var vm = this;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.edoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a' ];
    vm.sexo = ['Masculino', 'Femenino'];
    vm.dataPersonal = {};
    vm.processing = false;
    vm.loading= true;
    vm.anios = [];
    vm.dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    vm.meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    init();

    function init(){

        for (var i = 1910; i<2015; i++ ){
            vm.anios.push(i);
        }
        for (var i = 11; i<=31; i++ ){
            vm.dias.push(i);
        }
        //vm.dataPersonal.fecha_nacimiento
    }

    if(vm.method==='PUT'){
        personalService.getPersonal(vm.personal.id)
        .then(function(res){
            vm.dataPersonal = res;
            vm.loading= false;
            vm.anio = vm.dataPersonal.fecha_nacimiento.split('-')[0];
            vm.mes = vm.dataPersonal.fecha_nacimiento.split('-')[1];
            vm.dia = vm.dataPersonal.fecha_nacimiento.split('-')[2];
        });
    }else{
        vm.loading= false;
    }

    function guardar (){

        if(vm.dataPersonal.numero_agremiado &&
            vm.dataPersonal.numero_cedula &&
            vm.dataPersonal.primer_nombre &&
            vm.dataPersonal.primer_apellido &&
            vm.dataPersonal.email &&
            vm.dia && vm.anio && vm.mes &&
            vm.dataPersonal.estado_civil &&
            vm.dataPersonal.sexo &&
            vm.dataPersonal.direccion &&
            vm.dataPersonal.telefono_habitacion &&
            vm.dataPersonal.celular){
            vm.dataPersonal.fecha_nacimiento = vm.anio+'-'+vm.mes+'-'+vm.dia;
            vm.processing = true;
            if(vm.method === 'POST'){
                personalService.postPersonal(vm.dataPersonal)
                .then(function(){
                    $mdDialog.hide(true);
                })
                .catch(function (err) {
                    console.log(err);
                });
            }else{
                personalService.putPersonal(vm.dataPersonal)
                .then(function(){
                    $rootScope.$broadcast('data-select', vm.dataPersonal);
                    $mdDialog.hide(true);
                    vm.processing = false;
                })
                .catch(function (err) {
                    console.log(err);
                });
            }
        }

    }

    function cancel (){
		$mdDialog.cancel();
	}

}
