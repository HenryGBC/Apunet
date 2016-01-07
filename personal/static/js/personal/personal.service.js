angular
.module('personal')
.factory('personalService', personalService);

personalService.$inject = ['$http', '$q', 'apiUrl'];

function personalService($http, $q, apiUrl){
    var personal = [];
    var service = {
        initPersonal:initPersonal,
        postPersonal:postPersonal,
        getAllPersonal:getAllPersonal,
        putPersonal:putPersonal,
        getPersonal:getPersonal,
        getData:getData,
        putData:putData,
        postData:postData,
        deleteData:deleteData,
        updatePersonal: updatePersonal
    };



    return service;

    function initPersonal(){
         return $http({
             url: apiUrl + 'personal/',
             method: 'GET'
         })
         .then(getPersonalComplete)
         .catch(getPersonalFailed)

        function getPersonalComplete(response){
           personal = response.data;
        }
        function getPersonalFailed(response){
            console.log(response);
        }



    }
    function postPersonal(data){
        return $http({
            url: apiUrl + 'personal/',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            data: data
        })
        .then(postPersonalComplete)
        .catch(postPersonalFailed)

        function postPersonalComplete(response){
            personal.unshift(response.data);
            return response.data;
        }
        function postPersonalFailed(response){
            return response.data;
        }
    }
    function putPersonal(data){
        return $http({
            url: apiUrl + 'personal/'+data.id,
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            data: data
        })
        .then(putPersonalComplete)
        .catch(putPersonalFailed)

        function putPersonalComplete(response){
            updatePersonal(response.data);
        }
        function putPersonalFailed(response){
            console.log(response);
        }
    }
    function getPersonal(id){
        return $http({
            url: apiUrl + 'personal/'+id,
            method: 'GET'
        })
        .then(getPersonalComplete)
        .catch(getPersonalFailed)

        function getPersonalComplete(response){
            return response.data;
        }
        function getPersonalFailed(response){
            console.log(response);
        }
    }
    function getData(url, id){
        return $http({
            url: apiUrl+url+'/'+id,
            method: 'GET'
        })
        .then(getDataComplete)
        .catch(getDataFailed)

        function getDataComplete(response){
            return response.data;
        }
        function getDataFailed(response){
            console.log(response);
        }
    }

    function putData(url, data, id){
        return $http({
            url: apiUrl+url+'/'+id,
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            data: data
        })
        .then(putDataComplete)
        .catch(putDataFailed)

        function putDataComplete(response){
            return response.data;
        }
        function putDataFailed(response){
            console.log(response);
        }
    }
    function postData(url, data){
        return $http({
            url: apiUrl+url+'/',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            data: data
        })
        .then(postDataComplete)
        .catch(postDataFailed)

        function postDataComplete(response){
            return response.data;
        }
        function postDataFailed(response){
            return response.data;
        }
    }
    function deleteData(url, id){
        return $http({
            url: apiUrl+url+'/'+id,
            method: 'DELETE'
        })
        .then(deleteDataComplete)
        .catch(deleteDataFailed)

        function deleteDataComplete(response){
            return response.data;
        }
        function deleteDataFailed(response){
            return response.data;
        }
    }
    function updatePersonal(data){
        var i = 0;
        var index;
        angular.forEach(personal, function(item){
            if(item.id === data.id){
                index = i;
            }
            i++;
        });
        personal[index] = data;
    }


    function getAllPersonal(){
        return personal;
    }
}
