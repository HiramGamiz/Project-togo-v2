(function () {
    'use strict';

    angular
        .module('focus-track')
        .factory('TypeService', TypeService);

    TypeService.$inject = ['$http', 'EndPointService'];
    function TypeService($http, EndPointService) {
        var service = {
            get: get
        };

        return service; 

        ////////////////
        function get() {
            return $http
                .get('/data/types.json')
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();