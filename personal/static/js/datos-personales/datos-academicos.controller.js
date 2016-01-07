angular
.module('dPersonales')
.controller('DatosAcademicosController', DatosAcademicosController);


DatosAcademicosController.$inject = ['$scope', '$mdDialog', 'personalService', '$rootScope'];

function DatosAcademicosController($scope, $mdDialog, personalService, $rootScope){
    var vm = this;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.dataAcad = {};
    vm.processing = false;
    vm.loading= true;
    vm.anios = [];
    vm.dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    vm.meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    vm.condicionUno = ['Contratado', 'Ordinario', 'Miembro Especial', 'Jubilado', 'Ninguno'];
    vm.condicionDos = ['Instructor', 'Agregado', 'Asociado', 'Titular', 'Ninguno'];
    vm.condicionTres = ['Medio Tiempo', 'Tiempo Completo', 'Exclusiva', 'Tiempo Convenc..', 'Ninguno'];
    vm.condicionCuatro = ['Retirado', 'Fallecido', 'Ninguno'];
    init();

    function initDates(){
        vm.anioIngreso = vm.dataAcad.fecha_ingreso.split('-')[0];
        vm.mesIngreso = vm.dataAcad.fecha_ingreso.split('-')[1];
        vm.diaIngreso = vm.dataAcad.fecha_ingreso.split('-')[2];

        if(vm.dataAcad.fecha_retiro){
            vm.anioRetiro = vm.dataAcad.fecha_retiro.split('-')[0];
            vm.mesRetiro = vm.dataAcad.fecha_retiro.split('-')[1];
            vm.diaRetiro = vm.dataAcad.fecha_retiro.split('-')[2];
        }
        if(vm.dataAcad.fecha_jubilacio){
            vm.anioJub = vm.dataAcad.fecha_jubilacion.split('-')[0];
            vm.mesJub = vm.dataAcad.fecha_jubilacion.split('-')[1];
            vm.diaJub = vm.dataAcad.fecha_jubilacion.split('-')[2];
        }
        if(vm.dataAcad.fecha_cambio_dedicacion){
            vm.anioCD = vm.dataAcad.fecha_cambio_dedicacion.split('-')[0];
            vm.mesCD = vm.dataAcad.fecha_cambio_dedicacion.split('-')[1];
            vm.diaCD = vm.dataAcad.fecha_cambio_dedicacion.split('-')[2];
        }
        if(vm.dataAcad.fecha_ascenso){
            vm.anioAsc = vm.dataAcad.fecha_ascenso.split('-')[0];
            vm.mesAsc = vm.dataAcad.fecha_ascenso.split('-')[1];
            vm.diaAsc = vm.dataAcad.fecha_ascenso.split('-')[2];
        }

    }
    function init(){
        personalService.getData('datos-academicos', vm.id)
        .then(function(res){
            if(res){
                vm.method = 'PUT';
                vm.dataAcad = res;
                initDates();
                vm.loading=false;
            }else{
                vm.method = 'POST';
                vm.loading=false;
                vm.dataAcad.personal = vm.id;
            }

        });
        for (var i = 1910; i<2015; i++ ){
            vm.anios.push(i);
        }
        for (var i = 11; i<=31; i++ ){
            vm.dias.push(i);
        }
        //vm.dataPersonal.fecha_nacimiento
    }

    function concateDates(){
        vm.dataAcad.fecha_ingreso = vm.anioIngreso+'-'+vm.mesIngreso+'-'+vm.diaIngreso;
        if(vm.anioRetiro){
            vm.dataAcad.fecha_retiro = vm.anioRetiro+'-'+vm.mesRetiro+'-'+vm.diaRetiro;
        }
        if(vm.anioJub && vm.diaJub && vm.mesJub){
            vm.dataAcad.fecha_jubilacion = vm.anioJub+'-'+vm.mesJub+'-'+vm.diaJub;
        }
        if(vm.anioCD && vm.mesCD && vm.diaJub){
            vm.dataAcad.fecha_cambio_dedicacion = vm.anioCD+'-'+vm.mesCD+'-'+vm.diaCD;
        }
        if(vm.anioAsc && vm.mesAsc && vm.diaAsc){
            vm.dataAcad.fecha_ascenso = vm.anioAsc+'-'+vm.mesAsc+'-'+vm.diaAsc;
        }
    }
    function guardar (){
        if(vm.dataAcad.profesion && vm.dataAcad.especialidad &&
            vm.dataAcad.resolucion && vm.dataAcad.departamento &&
            vm.dataAcad.telefono_trabajo && vm.anioIngreso && vm.mesIngreso && vm.diaIngreso &&
            vm.dataAcad.condicion_uno){
                vm.processing = true;
                concateDates();
                if(vm.method === 'PUT'){
                    personalService.putData('datos-academicos', vm.dataAcad, vm.dataAcad.personal)
                    .then(function(res){
                        vm.processing = false;
                        $mdDialog.hide(true);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }else{
                    personalService.postData('datos-academicos', vm.dataAcad)
                    .then(function(res){
                        vm.processing = false;
                        $mdDialog.hide(true);
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
