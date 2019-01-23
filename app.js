let app = angular.module('app', ['ngRoute', 'ngCookies', 'ngSanitize']);

/** Rutas de la aplicación */
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'assets/layout/home.view.html'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'assets/layout/login.view.html'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'assets/layout/register.view.html'
        })

        .when('/mis-datos', {
            controller: 'MisDatosController',
            templateUrl: 'assets/layout/misDatos.view.html'
        })

        .otherwise({ redirectTo: '/login' });
});
/** */
app.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
}).directive('stopPropagation', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('click', function (e) {
                return false;
            });
        }
    };
});
/** */
app.factory('LoginService', function ($rootScope) {
    let isAuthenticated = false;

    return {
        login: function (username, password) {
            userDATOS.busqueda({value:username,entidad:"usuario",column:"user"}, function(data) {
                $rootScope.globals["currentUser"] = {};
                $rootScope.globals.currentUser["user"] = data.data.user
                $rootScope.globals.currentUser["idpersona"] = data.data.idpersona
                userDATOS.busqueda({ value: data.data.idpersona, entidad: "personatipo", column: "idpersona" }, function (e) {
                    $rootScope.globals.currentUser["idprofesional"] = e.data.idprofesional;
                    $rootScope.globals.currentUser["idayudante"] = e.data.idayudante;
                });
                userDATOS.busqueda({ value: $rootScope.globals.currentUser["idprofesional"], entidad: "profesional"}, function(e) {
                    $rootScope.globals.currentUser["idlugar"] = e.data.idlugar;
                });
                isAuthenticated = username === data.data.user && md5(password) === data.data.pass;
            });
            return isAuthenticated;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    };

});
/** */
app.controller('jsonController', ['$scope', '$rootScope', '$location', '$cookieStore', '$http', function ($scope, $rootScope, $location, $cookieStore, $http) {
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/mis-datos']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        var session = sessionStorage["user"] === undefined;
        if (restrictedPage && !loggedIn && session)
            $location.path('/login');
        
        if (!session)
            $rootScope.globals.currentUser = JSON.parse(sessionStorage["user"]);
        if ($("#divMenu p a.active").length) {
            l = $location.$$url;
            if(l == "") l = "/";
            href = $("#divMenu p a.active").data("url");
            $("#divMenu p a.active").attr("href", href.replace("/", "#!")).removeClass("active").addClass("effect-underline cursor-pointer");
            $("#divMenu p a[data-url='" + l + "']").removeAttr("href").removeClass("effect-underline cursor-pointer").addClass("active");
            // setTimeout(() => {
                $scope.menu();
                // console.log($scope)
            // }, 100);
        } else {
            l = $location.$$url
            if (l == "") l = "/";
            $("#divMenu p a[data-url='" + l + "']").removeAttr("href").removeClass("effect-underline cursor-pointer").addClass("active");
        }
    });

    $rootScope.menu = function () {
        if ($scope.showMenu) {
            html = "";
            html += "<h1 class='text-center text-uppercase w-100 mb-0 font-2_5 py-2 bg-dark text-white border-bottom position-fixed zIndexNormal fixed-top-left'>";
                html += "menu";
                html += "<span class='position-absolute'>";
                    html += "<i class='fas fa-times cursor-pointer text-white' ng-click='menu()'></i>";
                html += "</span>";
            html += "</h1>";
            html += "<div class='position-relative h-100-71px d-flex align-items-center'>";
                html += "<div class='w-100 font-2'>";
                    html += "<p class='text-center text-uppercase'><a data-url='/' href='#!' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-home mr-4'></i>home</a></p>";
                    if (parseInt($rootScope.globals.currentUser.idprofesional)) {
                        if ($rootScope.globals.currentUser.adm !== undefined) {
                            html += "<div class='border bg-light py-3 mb-4'>";
                                html += "<p class='text-center text-uppercase'><a data-url='/mi-lugar/especialidades' href='#!mi-lugar/especialidades' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-glasses mr-4'></i>especialidades</a></p>";
                                html += "<p class='text-center text-uppercase'><a data-url='/mi-lugar/profesionales' href='#!mi-lugar/profesionales' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-chalkboard-teacher mr-4'></i>profesionales</a></p>";
                                html += "<p class='text-center text-uppercase'><a data-url='/mi-lugar' href='#!mi-lugar' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-building mr-4'></i>mi lugar</a></p>";
                                html += "<p class='text-center text-uppercase mb-0'><a data-url='/mis-datos/mi-plan' href='#!mis-datos/mi-plan' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-plug mr-4'></i>mi plan</a></p>";
                            html += "</div>";
                        }
                        html += "<p class='text-center text-uppercase'><a data-url='/mis-datos' href='#!mis-datos' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-user-cog mr-4'></i>mis datos</a></p>";
                        html += "<p class='text-center text-uppercase'><a data-url='/ayudante' href='#!ayudante' class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='fas fa-headset mr-4'></i>ayudante</a></p>";
                    }
                    html += "<p class='text-center text-uppercase mb-0'><a class='d-inline-block position-relative effect-underline cursor-pointer text-dark'><i class='text-danger fas fa-power-off mr-4'></i>salir</a></p>";
                html += "</div>";
            html += "</div>";
            $scope.htmlMenu = html;
            $scope.showMenu = false;
            setTimeout(() => {
                l = $location.$$url;
                if (l == "") l = "/";
                $("#divMenu p a[data-url='" + l + "']").removeAttr("href").removeClass("effect-underline cursor-pointer").addClass("active");
            }, 100);
        } else {
            $scope.htmlMenu = "";
            $scope.showMenu = true;
        }
    }
}]);
app.controller("LoginController", function ($location, $rootScope, $scope, LoginService ) {
    $scope.login = function () {
        $scope.dataLoading = true;
        if (LoginService.login($scope.username, $scope.password)) {
            sessionStorage.setItem("user", JSON.stringify($rootScope.globals.currentUser));
            $location.path('/');
        } else {
            $scope.dataLoading = false;
            $scope.flash = {};
            $scope.flash["type"] = 'error'
            $scope.flash["message"] = "Usuario/contraseña incorrecta";
        }
    };
}).controller("HomeController", function ($rootScope, $scope) {
    $scope.user = { "user": $rootScope.globals.currentUser.user };
    userDATOS.busqueda({ value: $rootScope.globals.currentUser.idpersona, entidad: "persona"}, function( data ) {
        $scope.user["name"] = data.data.nombre + " " + data.data.apellido;
    });
    if ($rootScope.globals.currentUser.idprofesional) {
        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idprofesional, entidad: "profesional" }, function (data) {
            if(parseInt(data.data.administrador))
                $rootScope.globals.currentUser["adm"] = 1;
        }, true );
        userDATOS.vistaProfesional( $("#app"), "home" );
    }
}).controller("MisDatosController", function ($rootScope, $scope) {
    userDATOS.vistaProfesional( $("#app"), "misDatos" );

    prepararDato = function(t) {
        let input = $(t);
        let contenedor = input.closest(".form-row");

        if(input.is(":checked")) {
            contenedor.find("> div:not(div:first-child()) *").attr("disabled",true);
        } else
            contenedor.find("> div:not(div:first-child()) *").removeAttr("disabled");
    }
    changeContacto = function(t) {
        let select = $(t);
        let contenedor = select.closest(".form-row");
        switch(parseInt(select.val())) {
            case 1:
            case 2:
                contenedor.find("> div:last-child()").find("input").attr("type", "phone")
                if (contenedor.find("> div:last-child()").find("input.texto-text").length)
                    contenedor.find("> div:last-child()").find("input").removeClass("texto-text");
                if (contenedor.find("> div:last-child()").find("input.texto-email").length)
                    contenedor.find("> div:last-child()").find("input").removeClass("texto-email");
                contenedor.find("> div:last-child()").find("input").addClass("texto-phone text-right");
            break;
            case 3:
                contenedor.find("> div:last-child()").find("input").attr("type", "email")
                if (contenedor.find("> div:last-child()").find("input.texto-text").length)
                    contenedor.find("> div:last-child()").find("input").removeClass("texto-text");
                if (contenedor.find("> div:last-child()").find("input.texto-phone").length)
                    contenedor.find("> div:last-child()").find("input").removeClass("texto-phone text-right");
                contenedor.find("> div:last-child()").find("input").addClass("texto-email");
            break;
        }
    }
    editarPersonal = function() {
        $scope.editarPersonal();
    }
    deleteContacto = function () {
        $scope.deleteContacto();
    }
    addContacto = function(t) {
        $scope.addContacto(t);
    }
    ////// ------>
    $rootScope.submit = function() {
        if ($scope.dataOK) {
            if (userDATOS.validar("#modalXL form")) {
                let recargar = false;
                personaPyrus.busqueda({ attr: "id", value: $rootScope.globals.currentUser.idpersona }, function (data) {
                    let elemento = Object.assign({}, personaPyrus.elemento);
                    delete elemento.image, elemento.idlugar;
                    delete data.image, data.idlugar, data.autofecha, data.elim;
                    for (var i in elemento)
                        elemento[i] = $(`#persona_${i}`).val();
                    if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                        //Si el objeto es distinto, guarda la data;
                        personaPyrus.guardar_1(elemento);
                        recargar = true;
                    }
                });
                personaDomicilioPyrus.busqueda({ attr: "idpersona", value: $rootScope.globals.currentUser.idpersona }, function (data) {
                    let elemento = Object.assign({}, personaDomicilioPyrus.elemento);
                    delete data.autofecha, data.elim;
                    for (var i in elemento)
                        elemento[i] = $(`#personadomicilio_${i}`).val();
                    if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                        personaDomicilioPyrus.guardar_1(elemento);
                        recargar = true;
                    }
                });
                profesionalPyrus.busqueda({ attr: "id", value: $rootScope.globals.currentUser.idprofesional }, function (data) {
                    let elemento = Object.assign({}, profesionalPyrus.elemento);
                    delete elemento.administrador, elemento.idlugar;
                    delete data.autofecha, data.elim, data.administrador, data.idlugar;
                    for (var i in elemento)
                        elemento[i] = $(`#profesional_${i}`).val();
                    if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                        profesionalPyrus.guardar_1(elemento);
                        recargar = true;
                    }
                });
                $("#personaContacto").find(".contenedorForm").each(function (data) {
                    id = $(this).find("input[placeholder='ID']").val();
                    contacto = $(this).find("> div");
                    /**
                     * CAMBIAR el conteo de contactos
                     * Si suma cantidad (toma como ID en la tabla), puede ocasionar conflicto y perdida de información
                     * Cuando se agregue un nuevo contacto, que tome un VALOR negativo
                     */
                    personaContactoPyrus.busqueda({ attr: "id", value: $(this).val() }, function (ddata) {
                        let elemento = Object.assign({}, personaContactoPyrus.elemento);
                        delete ddata.autofecha, ddata.elim;
                        if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                            profesionalPyrus.guardar_1(elemento);
                            recargar = true;
                        }
                    });
                });
                userDATOS.busqueda({ value: 1, column: "idpersona", retorno: 0, entidad: "personacontacto" }, function (data) {
                    for(var i in data.data) {
                        personaContactoPyrus.busqueda({ attr: "id", value: i }, function (ddata) {
                            let elemento = Object.assign({}, personaContactoPyrus.elemento);
                            if ($(`#personacontacto_idpersona_${i}`).length) {
                                
                                
                            } else {
                                personaContactoPyrus.query("baja_generica", { entidad: "personacontacto", id: i }, function() {});
                            }
                        });
                    }
                    if (recargar)
                        userDATOS.vistaProfesional($("#app"), "misDatos");
                });
            }
        } else
            userDATOS.notificacion("Debe confirmar los datos");
    }
    $scope.addContacto = function(t) {
        let target = $(t);

        if (window.personaContacto === undefined) window.personaContacto = 0;
        window.personaContacto ++;
        target.append(personaContactoPyrus.formulario_OK(window.personaContacto));
        userDATOS.select2(`#personacontacto_tipocontacto_${window.personaContacto}`);
        $rootScope.$digest();
    }
    $scope.deleteContacto = function () {
        let target = $("#personaContacto");

        if (target.find("input[type='checkbox']:checked").length == 0) {
            userDATOS.notificacion("No seleccionó ningún contacto","error");
            return false;
        }
        target.find("input[type='checkbox']:checked").each(function () {
            $(this).closest(".form-row").remove();
        });
    }
    $scope.completarDatos = function() {
        let target = $("#modalXL");
        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idpersona, entidad: "persona" }, function (data) {
            target.find(`#persona_id`).val(data.data.id).trigger("change");
            target.find(`#persona_nombre`).val(data.data.nombre).trigger("change");
            target.find(`#persona_apellido`).val(data.data.apellido).trigger("change");
            target.find(`#persona_documento`).val(data.data.documento).trigger("change");
            target.find(`#persona_tipodocumento`).val(data.data.tipodocumento).trigger("change");
            userDATOS.select2("#persona_tipodocumento");
            target.find(`#persona_fechanacimiento`).val(data.data.fechanacimiento).trigger("change");
            // target.find(`#persona_nombre,#persona_apellido,#persona_documento,#persona_tipodocumento,#persona_fechanacimiento`).attr("disabled",true)
        }, true);
        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idpersona, entidad: "personadomicilio", column: "idpersona" }, function (data) {
            if(data.data !== null)  {
                target.find(`#personadomicilio_id`).val(data.data.id).trigger("change");
                target.find(`#personadomicilio_idpersona`).val(data.data.idpersona).trigger("change");
                target.find(`#personadomicilio_calle`).val(data.data.calle).trigger("change");
                target.find(`#personadomicilio_altura`).val(data.data.altura).trigger("change");
                target.find(`#personadomicilio_codigopostal`).val(data.data.codigopostal).trigger("change");
                target.find(`#personadomicilio_idlocalidad`).val(data.data.idlocalidad).trigger("change");
            }
            userDATOS.select2("#personadomicilio_idlocalidad");
        }, true);

        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idpersona, entidad: "personacontacto", column: "idpersona", retorno: 0 }, function (data) {
            if (window.personaContacto === undefined) window.personaContacto = 0;
            if(data.data.length == 0) {
                target.find("#personaContacto").append(`<p class="mb-0 text-muted sin">Sin contactos</p>`);
            } else {
                if (target.find("#personaContacto").find(".cargando").length)
                    target.find("#personaContacto").find(".cargando").remove();
                for(var i in data.data) {
                    window.personaContacto = i;
                    // $scope.personaContacto
                    target.find("#personaContacto").append(personaContactoPyrus.formulario_OK(i));
                    // target.find("#personaContacto").find(`#personacontacto_tipocontacto_${data.data[i]["id"]}`).closest(".form-row").find("> div:first-child input").attr("name", `checkbox_${data.data[i]["id"]}`).attr("ng-model", `checkbox_${data.data[i]["id"]}`)
                    target.find("#personaContacto").find(`#personacontacto_id_${data.data[i]["id"]}`).val(data.data[i]["id"]).trigger("change");
                    target.find("#personaContacto").find(`#personacontacto_idpersona_${data.data[i]["id"]}`).val(data.data[i]["idpersona"]).trigger("change");
                    target.find("#personaContacto").find(`#personacontacto_tipocontacto_${data.data[i]["id"]}`).val(data.data[i]["tipocontacto"]).trigger("change");
                    userDATOS.select2(`#personacontacto_tipocontacto_${data.data[i]["id"]}`);
                    target.find("#personaContacto").find(`#personacontacto_detalle_${data.data[i]["id"]}`).val(data.data[i]["detalle"]).trigger("change");
                }
            }
        }, true);

        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idprofesional, entidad: "profesional" }, function (data) {
            if(data.data !== null)  {
                target.find(`#profesional_id`).val(data.data.id).trigger("change");
                target.find(`#profesional_matricula`).val(data.data.matricula).trigger("change");
                target.find(`#profesional_duracionturno`).val(data.data.duracionturno).trigger("change");
                target.find(`#profesional_entreturno`).val(data.data.entreturno).trigger("change");
                target.find(`#profesional_detalle`).val(data.data.detalle).trigger("change");
            }
            userDATOS.select2("#profesional_idespecializacion");
        }, true);
    }
    $scope.editarPersonal = function() {
        $rootScope.htmlModal = `<img class="d-block mx-auto w-50 h-50" src="${imgLoading}" />`;
        $rootScope.$digest();
        $("#modalXL").modal("show");
        let promise = new Promise(function (resolve, reject) {
            let html = "";
            html += `<div class="modal-header bg-light">`;
                html += `<h5 class="modal-title text-uppercase">Mis datos</h5>`;
                html += `<button type="button" class="close" data-dismiss="modal" aria-label="Close">`;
                    html += `<span aria-hidden="true">&times;</span>`;
                html += `</button>`;
            html += `</div>`;
            html += `<form name="formContacto" ng-submit="submit();" role="form" method="post" novalidate ng-class="dataOK ? 'was-validated' : ''">`;
                html += `<div class="modal-body">`;
                    html += `<div class="row">`;
                        html += `<div class="col-6">`;
                            html += `<h3>Datos personales</h3>`;
                            html += personaPyrus.formulario_OK();
                        html += `</div>`;
                        html += `<div class="col-6">`;
                            html += `<h3>Domicilio</h3>`;
                            html += personaDomicilioPyrus.formulario_OK();
                        html += `</div>`;
                    html += `</div>`;
                    html += `<div class="row pt-4">`;
                        html += `<div class="col-6">`;
                            html += `<h3>Contacto<div class="float-right btn-group"><button onclick="addContacto('#personaContacto')" type="button" class="btn btn-sm btn-primary"><i class="fas fa-plus"></i></button><button onclick="deleteContacto()" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></div></h3>`;
                            html += `<div id="personaContacto" dynamic="personaContacto">`;
                                html += `<p class="mb-0 text-center text-muted cargando">Buscando información de contactos</p>`;
                            html += `</div>`;
                        html += `</div>`;
                        html += `<div class="col-6">`;
                            html += `<h3>Datos profesionales</h3>`;
                            msg = "Si no encuentró su especialización, comuniquese con el administrador del lugar para establecer los datos necesarios.";
                            html += `<div class="alert alert-primary" role="alert" style="font-size:.8em">${msg}</div>`;
                            html += profesionalPyrus.formulario_OK();
                        html += `</div>`;
                    html += `</div>`;
                html += `</div>`;
                html += `<div class="modal-footer w-100 d-block bg-light">`;
                    html += `<div class="row">`;
                        html += `<div class="col-6 d-flex align-items-center">`;
                            html += '<label class="m-0 d-block"><input ng-init="dataOK = false" ng-model="dataOK" name="checkboxOK" ng-model="checkboxOK" type="checkbox" class="mr-2"/>Estoy de acuerdo en modificar estos datos</label>'
                        html += `</div>`;
                        html += `<div class="col-6 d-flex justify-content-end">`;
                            html += `<button type="submit" ng-disabled="(!dataOK || formContacto.$invalid)" class="btn btn-lg text-uppercase btn-success" id="btnConfirmar">confirmar</button>`
                        html += `</div>`;
                    html += `</div>`;
                html += `</div>`;
            html += `</form>`;
            
            resolve(html);
        });
        promiseFunction = () => {
            promise
                .then(function(h) {
                    $rootScope.htmlModal = h;
                    $rootScope.$digest();
                    $scope.completarDatos();
                })
        };
        
        setTimeout(() => {
            promiseFunction();
        }, 1500 );
    }
});
