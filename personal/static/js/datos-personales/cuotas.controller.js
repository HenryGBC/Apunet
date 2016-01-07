angular
.module('dPersonales')
.controller('CuotasController', CuotasController);


CuotasController.$inject = ['$scope', '$mdDialog', 'personalService', '$rootScope'];

function CuotasController($scope, $mdDialog, personalService, $rootScope){
    var vm = this;
    vm.guardar = guardar;
    vm.cancel = cancel;
    vm.dataCuotas = {};
    vm.processing = false;
    vm.loading= true;
    init();


    function init(){
        personalService.getData('cuotas', vm.id)
        .then(function(res){
            if(res){
                vm.method = 'PUT';
                vm.dataCuotas = res;
                vm.loading=false;
            }else{
                vm.method = 'POST';
                vm.loading=false;
                vm.dataCuotas.personal = vm.id;
            }

        });
        //vm.dataPersonal.fecha_nacimiento
    }


    function guardar (){

        if(vm.dataCuotas.pago_mensual_apunet && vm.dataCuotas.pago_mensual_cercpu &&
            vm.dataCuotas.pago_aportacion_cercpu && vm.dataCuotas.aporte_fapuv &&
            vm.dataCuotas.aporte_prev_social && vm.dataCuotas.pagos_extraordinarios){
                vm.processing = true;
                if(vm.method === 'PUT'){
                    personalService.putData('cuotas', vm.dataCuotas, vm.dataCuotas.personal)
                    .then(function(res){
                        vm.processing = false;
                        $mdDialog.hide(true);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }else{
                    personalService.postData('cuotas', vm.dataCuotas)
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
