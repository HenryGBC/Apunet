angular.module('apunetApp', [
    'ngAnimate',
    'ngMaterial',
    'personal',
    'constants',
    'personal',
    'dPersonales'
]);
angular.module('apunetApp').controller('AppController', ['$rootScope', '$scope', '$mdDialog', function ($rootScope, $scope, $mdDialog){
    var vm = this;
    vm.datosPersonales = datosPersonales;

    function datosPersonales($event){
        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'static/js/datos-personales/datos-personales.tpl.html',
			controller:'DatosPersonalesController',
			controllerAs:'vm',
			bindToController:true,
			clickOutsideToClose:false,
			locals: {
				personal: '',
				method: 'POST'
			}
		});
    }

}]);
