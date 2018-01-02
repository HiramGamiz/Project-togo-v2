(function () {
    'use strict';

    angular
        .module('focus-track')
        .factory('MasterProjectService', MasterProjectService);

        MasterProjectService.$inject = ['$http', 'EndPointService'];
    function MasterProjectService($http, EndPointService) {
        var service = {
            get: get
        };

        return service; 

        ////////////////
        function get() {
            return $http
                .get('/data/projects.json')
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();