(function () {
    'use strict';

    angular
        .module('focus-track')
        .factory('StageService', StageService);

        StageService.$inject = ['$http', 'EndPointService'];
    function StageService($http, EndPointService) {
        var service = {
            get: get
        };

        return service; 

        ////////////////
        function get() {
            return $http
                .get('/data/stages.json')
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();