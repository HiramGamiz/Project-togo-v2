(function () {
    'use strict';

    angular
        .module('focus-track')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$mdToast', '$localStorage', '$http'];
    function LoginController($state, $mdToast, $localStorage, $http) {
        var vm = this;
        vm.loginForm = {
            user: '',
            password: ''
        };

        vm.login = login;

        activate();

        ////////////////

        function activate() {
            console.log('Login\'s view: ', vm);
        }

        function login($form) {

            $http
                .get('https://3wmkp5h6pf.execute-api.us-east-1.amazonaws.com/prod/t2gotoken')
                .then(function (response) {
                    console.log('Token obtenido correctamente.');
                    $localStorage.authorizationData = {};
                    $localStorage.authorizationData.token = response.data['access_token'];
                    $localStorage.authorizationData.username = $form.user;
                    $localStorage.authorizationData.password = $form.password;

                    var url = 'https://focusproxy.herokuapp.com/services/apexrest/Accesar?codigoagente=' + $form.user + '&password=' + $form.password;
                    $http
                        .get(url)
                        .then(function (response) {
                            console.log(response);
                            if(response.data.exito){
                              $state.go('project', vm.loginForm);
                            }else{
                              $mdToast.show(
                                  $mdToast.simple()
                                      .textContent('Usuario ó contraseña incorrectos')
                                      .position('top right')
                              );
                            }
                        })
                        .catch(function (response) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Usuario ó contraseña incorrectos')
                                    .position('top right')
                            );
                        });
                })
                .catch(function (response) {
                    console.log('Falló la petición del token.');
                });


        }

    }
    function Encrypt(input) {
            /* jshint ignore:start */
          
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          
            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
          
                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
          
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
          
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
          
                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);
          
                    return output;
                }
    }
}
})();
