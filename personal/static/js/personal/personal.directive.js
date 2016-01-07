angular
    .module('personal')
    .directive('apunetPersonal', apunetPersonal);

function apunetPersonal(){
    var directive = {
        restrict: 'E',
        replace: true,
        scope:{},
        templateUrl: 'static/js/personal/personal.tpl.html',
        controller: apunetPersonalController,
        controllerAs: 'vm',
        link: linkFunction,
        bindToController: true
    };

    return directive;

    function linkFunction(scope, elem, attr){
        $('.menu-detail').on('click', function(event){
            event.stopPropagation();
            $('.menu-content').addClass('open');
            $('.menu-content').removeClass('ng-hide');
            $('.menu-content').addClass('animated flipInY');

        });
        $('body').on('click', function(event){
            if($('.menu-content').hasClass('open')){
                $('.menu-content').addClass('ng-hide');
                $('.menu-content').removeClass('open');
                $('.menu-content').removeClass('animated slideInDown');
            }
        });
    }

}


apunetPersonalController.$inject =['$scope', 'personalService', '$mdDialog', '$timeout'];

function apunetPersonalController($scope, personalService, $mdDialog, $timeout){
    var vm = this;
    vm.datosPersonales = datosPersonales;
    vm.datosAcademicos = datosAcademicos;
    vm.datosFamiliares = datosFamiliares;
    vm.cuotas = cuotas;
    vm.datosGremiales = datosGremiales;
    vm.deportes = deportes;
    vm.menu = false;
    vm.selectPersonal = selectPersonal;
    vm.eliminar = eliminar;
    vm.showPersonal = false;
    vm.animate = false;

    vm.personalSelect = {};
    vm.loading=true;
    personalService.initPersonal()
    .then(function(){
        vm.personal = personalService.getAllPersonal();
        vm.loading=false;
    });


    function datosPersonales($event, personalData){
        var dataPersonal = vm.personalSelect;
        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl:'static/js/datos-personales/datos-personales.tpl.html',
            controller:'DatosPersonalesController',
            bindToController:true,
            clickOutsideToClose:false,
            controllerAs: 'vm',
            resolve: {
				personal:function(){return dataPersonal;},
                method:function(){return 'PUT';},
			}
        });
    }
    function datosAcademicos($event, personalData){
        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl:'static/js/datos-personales/datos-academicos.tpl.html',
            controller:'DatosAcademicosController',
            bindToController:true,
            clickOutsideToClose:false,
            controllerAs: 'vm',
            resolve: {
				id:function(){return personalData.id;},
			}
        });
    }

    function datosFamiliares($event, personalData){

        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl:'static/js/datos-personales/familiares.tpl.html',
            controller:'FamiliarController',
            bindToController:true,
            clickOutsideToClose:false,
            controllerAs: 'vm',
            resolve: {
				id:function(){return personalData.id;},
			}
        });
    }

    function cuotas($event, personalData){

        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl:'static/js/datos-personales/cuotas.tpl.html',
            controller:'CuotasController',
            bindToController:true,
            clickOutsideToClose:false,
            controllerAs: 'vm',
            resolve: {
				id:function(){return personalData.id;},
			}
        });
    }
    function datosGremiales($event, personalData){

        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl:'static/js/datos-personales/datos-gremiales.tpl.html',
            controller:'DatosGremialesController',
            bindToController:true,
            clickOutsideToClose:false,
            controllerAs: 'vm',
            resolve: {
				id:function(){return personalData.id;},
			}
        });
    }

    function deportes($event, personalData){

        var parentEl = angular.element(document.body);
        var datosFormDialog = $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl:'static/js/datos-personales/deportes.tpl.html',
            controller:'DeportesController',
            bindToController:true,
            clickOutsideToClose:false,
            controllerAs: 'vm',
            resolve: {
				id:function(){return personalData.id;},
			}
        });
    }

    function selectPersonal(data){
        vm.personalSelect = data;
        vm.showPersonal = true;
        vm.animate = true;
        $timeout( function(){vm.animate = false;}, 500);
        /*personalService.getPersonal(data.id)
        .then(function(res){
            vm.personalSelect = res;
        });*/
    }
    function eliminar ($event, id){
		var confirm = $mdDialog.confirm()
			.parent(angular.element(document.body))
			.title('Confirmar Borrado')
			.content('Estas apunto de eliminar un personal, ¿Estás seguro que deseas continuar?')
			.ariaLabel('Delete')
			.ok('Confirmar')
			.cancel('Cancelar')
			.targetEvent($event);
		$mdDialog.show(confirm).then(function() {
            var i = 0;
            var index;
			personalService.deleteData('personal', id)
            .then(function(res){
                console.log(res);
                angular.forEach(vm.personal, function(item){
                    if(item.id === id){
                        index = i;
                    }
                    i++;
                });
                vm.personal.splice(index, 1);
                vm.personalSelect = {};
            });

		}, function() {
			console.log('Canceló');
		});
	}
    function dataSelect(ev, data){
        vm.selectPersonal(data);
    }

    $scope.$on('data-select', dataSelect);
}
