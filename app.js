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
}).directive("addcontacto", function ($compile) {
    return function (scope, element, attrs) {
        element.bind("click", function () {
            // if (window.personaContactoNUM === undefined)
            //     window.personaContactoNUM = 0;
            /** Revisar. Recibe un objeto */
            console.log(window.personaContactoNUM)
            window.personaContactoNUM++;
            if ($("#personaContacto").find(".sin").length)
                $("#personaContacto").find(".sin").remove();
            angular.element(document.getElementById('personaContacto')).append($compile(`<div contacto="${window.personaContactoNUM}"></div>`)(scope));
            angular.element(document.getElementById('personaContacto')).scope().$digest();
            angular.element(document.getElementById('personaContacto')).scope().$parent.$digest();
        });
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
})
.directive('contactoReplace', function ($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        template: function(elem,attrs) {
            return personaContactoPyrus.formulario_OK(attrs.contactoReplace, "checkData('dataOK')")
        },
        link: function (scope, elem, attrs) {
        }
    };
})

.directive('contacto', function ($compile, $timeout, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var rep = $compile(`<div contacto-replace="${attrs.contacto}"></div>`);
            var theClone = rep($rootScope.$new(), function (clone) {
                element.append(clone);
            });
            $timeout(function () {
                userDATOS.select2(`#personacontacto_tipocontacto_${attrs.contacto}`);
            },100);
        }
    };
})
/** */
app.factory('LoginService', function ($rootScope) {
    let isAuthenticated = false;

    return {
        login: function (username, password) {
            userDATOS.busqueda({value:username,entidad:"usuario",column:"user"}, function(data) {
                $rootScope.globals["currentUser"] = {};
                $rootScope.globals.currentUser["user"] = data.data.user;
                $rootScope.globals.currentUser["idusuario"] = data.data.id;
                $rootScope.globals.currentUser["idpersona"] = data.data.idpersona;
                $rootScope.globals.currentUser["idlugar"] = data.data.idlugar;
                userDATOS.busqueda({ value: data.data.id, entidad: "personatipo", column: "idusuario" }, function (e) {
                    if (e.data.idprofesional >= 0) {
                        $rootScope.globals.currentUser["idprofesional"] = e.data.idprofesional;
                        $rootScope.globals.currentUser["idayudante"] = e.data.idayudante;
                    }
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
                    if (parseInt($rootScope.globals.currentUser.idprofesional) >= 0) {
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
        if(data.data === null)
            $scope.user["name"] = "SIN DATO";
        else
            $scope.user["name"] = `${data.data.nombre} ${data.data.apellido}`;
    });
    if ($rootScope.globals.currentUser.idprofesional) {
        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idprofesional, entidad: "profesional" }, function (data) {
            if(data.data !== null) {
                if(parseInt(data.data.administrador))
                    $rootScope.globals.currentUser["adm"] = 1;
            }
        }, true );
        userDATOS.vistaProfesional( $("#app"), "home" );
    }
}).controller("MisDatosController", function ($rootScope, $scope, $timeout) {
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
    ////// ------>
    $rootScope.checkData = (data) => {
        return $scope[data];
    };
    $rootScope.submit = function() {
        $("#modalXL form").addClass("was-validated");
        if ($("#modalXL form").find(".text-danger").length)
            $("#modalXL form").find(".text-danger").removeClass("text-danger");
        if ($("#modalXL form").find(".border-danger").length)
            $("#modalXL form").find(".border-danger").removeClass("border-danger");
        if ($scope.dataOK) {
            if (userDATOS.validar("#modalXL form")) {
                if ($("#profesional_duracionturno").val() == "00:00") {
                    userDATOS.notificacion("La duración de un turno debe ser mayor a 00:00","error");
                    return false;
                }
                $scope.dataLoading = true;
                let promise = new Promise(function (resolve, reject) {
                    var recargar = false;
                    var error = null;
                    personaPyrus.busqueda({ attr: "id", value: $rootScope.globals.currentUser.idpersona }, function (data) {
                        let elemento = Object.assign({}, personaPyrus.elemento);
                        delete elemento.image;
                        delete elemento.idlugar;
                        for (var i in elemento)
                            elemento[i] = $(`#persona_${i}`).val();
                        if(data === null) {
                            elemento.idlugar = $rootScope.globals.currentUser.idlugar;
                            elemento.id = "nulo";
                            a = personaPyrus.guardar_1(elemento, false, 0);
                            if (a != 0) {
                                recargar = true;
                                user = JSON.parse(sessionStorage["user"]);
                                user.idpersona = a;
                                sessionStorage.user = JSON.stringify(user);
                                $rootScope.globals.currentUser = user;
                                usuarioPyrus.guardar($rootScope.globals.currentUser.idusuario, $rootScope.globals.currentUser.idpersona,"idpersona");
                                userDATOS.busqueda({ value: $rootScope.globals.currentUser.idusuario, entidad: "personatipo", column: "idusuario" }, function (e) {
                                    personaTipoPyrus.guardar(e.data.id, $rootScope.globals.currentUser.idpersona,"idpersona");
                                });
                            } else error = { tipo: "persona", texto: "Datos personales en uso" };
                        } else {
                            delete data.image;
                            delete data.idlugar;
                            delete data.autofecha;
                            delete data.elim;
                            if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                                //Si el objeto es distinto, guarda la data;
                                a = personaPyrus.guardar_1(elemento, false, 1);
                                if (a != 0)
                                    recargar = true;
                                else error = { tipo: "persona", texto: "Datos personales en uso" };
                            }
                        }
                    }, false);
                    if (error !== null)
                        reject(error);
                    personaDomicilioPyrus.busqueda({ attr: "idpersona", value: $rootScope.globals.currentUser.idpersona }, function (data) {
                        let elemento = Object.assign({}, personaDomicilioPyrus.elemento);
                        for (var i in elemento)
                            elemento[i] = $(`#personadomicilio_${i}`).val();
                        if(data === null) {
                            elemento.idpersona = $rootScope.globals.currentUser.idpersona;
                            elemento.id = "nulo";
                            a = personaDomicilioPyrus.guardar_1(elemento, false, 0);
                            if (a != 0)
                                recargar = true;
                            else error = { tipo: "domicilio", texto: "Datos del domicilio en uso" };
                        } else {
                            delete data.autofecha;
                            delete data.elim;
                            if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                                a = personaDomicilioPyrus.guardar_1(elemento, false, 0);
                                if (a != 0)
                                    recargar = true;
                                else error = { tipo: "domicilio", texto: "Datos del domicilio en uso" };
                            }
                        }
                    }, false);
                    if (error !== null)
                        reject(error);
                    profesionalPyrus.busqueda({ attr: "id", value: $rootScope.globals.currentUser.idprofesional }, function (data) {
                        let elemento = Object.assign({}, profesionalPyrus.elemento);
                        delete elemento.administrador;
                        delete elemento.idlugar;
                        for (var i in elemento)
                            elemento[i] = $(`#profesional_${i}`).val();
                        if(data === null) {
                            elemento.idlugar = $rootScope.globals.currentUser.idlugar;
                            elemento.id = "nulo";
                            a = profesionalPyrus.guardar_1(elemento, false, 1);
                            if (a != 0) {
                                recargar = true;
                                $(`#profesional_id`).val(a);
                                user = JSON.parse(sessionStorage["user"]);
                                user.idprofesional = a;
                                sessionStorage.user = JSON.stringify(user);
                                $rootScope.globals.currentUser = user;
                                userDATOS.busqueda({ value: $rootScope.globals.currentUser.idusuario, entidad: "personatipo", column: "idusuario" }, function (e) {
                                    personaTipoPyrus.guardar(e.data.id, $rootScope.globals.currentUser.idprofesional, "idprofesional");
                                });
                            } else error = { tipo: "profesional", texto: "Datos del profesional en uso" };
                        } else {
                            delete data.autofecha;
                            delete data.elim;
                            delete data.administrador;
                            delete data.idlugar;
                            if (!Object.is(JSON.stringify(elemento), JSON.stringify(data))) {
                                a = profesionalPyrus.guardar_1(elemento, false, 1);
                                if (a != 0) {
                                    recargar = true;
                                } else error = { tipo: "profesional", texto: "Datos del profesional en uso" };
                            }
                        }
                    }, false);
                    if (error !== null)
                        reject(error);

                    userDATOS.busqueda({ value: $rootScope.globals.currentUser.idpersona, column: "idpersona", retorno: 0, entidad: "personacontacto" }, function (data) {
                        for (var i in data.data) {
                            if (!$(`#personacontacto_id_${i}`).length && $(`#personacontacto_id_${i}`).val() != "") {
                                recargar = true;
                                personaContactoPyrus.query("baja_generica", { entidad: "personacontacto", id: i }, function () { });
                            }
                        }

                        $("#personaContacto").find(".contenedorForm").each(function (data) {
                            id = $(this).find("input[placeholder='ID']").val();
                            contacto = $(this).find("> div");
                            if (id == "") {
                                tipoContacto = contacto.find("div:nth-child(2) select").val();
                                detalle = contacto.find("div:nth-child(3) input").val();
                                elemento = Object.assign({}, personaContactoPyrus.elemento);
                                elemento.idpersona = $rootScope.globals.currentUser.idpersona;
                                elemento.tipocontacto = tipoContacto;
                                elemento.detalle = detalle;
                                a = personaContactoPyrus.guardar_1(elemento, false, 0);
                                if (a != 0)
                                    recargar = true;
                                else error = { tipo: "contacto", texto: "Contacto repetido", elemento: elemento };
                            } else {
                                personaContactoPyrus.busqueda({ attr: "id", value: id }, function (ddata) {
                                    elemento = Object.assign({}, personaContactoPyrus.elemento);
                                    delete ddata.elim;
                                    delete ddata.autofecha;
                                    for (var i in elemento)
                                        elemento[i] = $(`#personacontacto_${i}_${ddata.id}`).val();
                                    if (!Object.is(JSON.stringify(elemento), JSON.stringify(ddata))) {
                                        a = personaContactoPyrus.guardar_1(elemento, false, 0);
                                        if (a != 0)
                                            recargar = true;
                                        else error = { tipo: "contacto", texto: "Contacto repetido", elemento: elemento };
                                    }
                                }, false);
                            }
                            if (error !== null)
                                reject(error);
                        });
                    });
                    resolve(recargar);
                });
                promiseFunction = () => {
                    promise
                        .then(function (recargar) {
                            $rootScope.dataOK = false;
                            $rootScope.dataLoading = false;
                            if (recargar)
                                userDATOS.vistaProfesional($("#app"), "misDatos");
                            $("#modalXL").modal("hide");
                        }, function(err) {
                            console.log(err)
                            $("#modalXL form").removeClass("was-validated");
                            userDATOS.notificacion(err.texto,"error");
                            switch(err.tipo) {
                                case "contacto":
                                    $("#personaContacto").find(".contenedorForm").each(function (data) {
                                        contacto = $(this).find("> div");
                                        tipoContacto = contacto.find("div:nth-child(2) select").val();
                                        detalle = contacto.find("div:nth-child(3) input").val();
                                        if (err.elemento.tipocontacto == tipoContacto && elemento.detalle == detalle) {
                                            contacto.addClass("text-danger");
                                            contacto.find("div:nth-child(3) input").addClass("border-danger");
                                        }
                                    });
                                    break;
                                case "persona":
                                    $("#persona_tipodocumento").prev().addClass("text-danger");
                                    $("#persona_documento,#persona_nombre,#persona_apellido").prev().addClass("text-danger");
                                    $("#persona_documento,#persona_nombre,#persona_apellido").addClass("border-danger");
                                    break;
                                case "domicilio":
                                    $("#form_personadomicilio label").addClass("text-danger");
                                    $("#form_personadomicilio input").addClass("border-danger");
                                    break;
                            }
                        })
                };

                setTimeout(() => {
                    promiseFunction();
                }, 500);
            } else {
                userDATOS.notificacion("Faltan datos datos","error");
                return false;
            }
        } else {
            userDATOS.notificacion("Debe confirmar los datos");
            return false;
        }
    }
    $scope.deleteContacto = function () {
        let target = $("#personaContacto");
        
        if (target.find("input[type='checkbox']:checked").length == 0) {
            userDATOS.notificacion("No seleccionó ningún contacto","error");
            return false;
        }
        target.find("input[type='checkbox']:checked").each(function () {
            $(this).closest(".contenedorForm").parent().remove();
            $scope.$digest();
        });
        if ($("[contacto]").length == 0)
            $("#personaContacto").append(`<p class="mb-0 text-muted sin text-center">Sin contactos</p>`);
    }
    $scope.completarDatos = function($timeout) {
        let target = $("#modalXL");
        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idpersona, entidad: "persona" }, function (data) {
            if (data.data === null) {
                userDATOS.select2("#persona_tipodocumento");
            } else {
                target.find(`#persona_id`).val(data.data.id).trigger("change");
                target.find(`#persona_nombre`).val(data.data.nombre).trigger("change");
                target.find(`#persona_apellido`).val(data.data.apellido).trigger("change");
                target.find(`#persona_documento`).val(data.data.documento).trigger("change");
                target.find(`#persona_tipodocumento`).val(data.data.tipodocumento).trigger("change");
                userDATOS.select2("#persona_tipodocumento");
                target.find(`#persona_fechanacimiento`).val(data.data.fechanacimiento).trigger("change");
            }
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
            if (window.personaContactoNUM === undefined) window.personaContactoNUM = 0;
            if(data.data.length == 0) {
                if (target.find("#personaContacto").find(".cargando").length)
                    target.find("#personaContacto").find(".cargando").remove();
                target.find("#personaContacto").append(`<p class="mb-0 text-muted sin text-center">Sin contactos</p>`);
            } else {
                let promise = new Promise(function (resolve, reject) {
                    personaContactoHTML = "";
                    window.ARR_data = [];
                    for(var i in data.data) {
                        window.personaContactoNUM = i;
                        //ACA
                        // target.find("#personaContacto").append(personaContactoPyrus.formulario_OK(i));
                        personaContactoHTML += `<div contacto="${i}"></div>`
                        ARR_data.push({ id: data.data[i]["id"], idpersona: data.data[i]["idpersona"], tipocontacto: data.data[i]["tipocontacto"], detalle: data.data[i]["detalle"] });
                    }

                    resolve(personaContactoHTML);
                });
                promiseFunction = () => {
                    promise
                        .then(function (personaContactoHTML) {
                            $rootScope.personaContacto = personaContactoHTML;
                            $rootScope.$digest();
                            setTimeout(() => {
                                window.ARR_data.forEach(function (data) {
                                    $("#personaContacto").find(`#personacontacto_id_${data["id"]}`).val(data["id"]).trigger("change");
                                    $("#personaContacto").find(`#personacontacto_idpersona_${data["id"]}`).val(data["idpersona"]).trigger("change");
                                    $("#personaContacto").find(`#personacontacto_tipocontacto_${data["id"]}`).val(data["tipocontacto"]).trigger("change");
                                    $("#personaContacto").find(`#personacontacto_detalle_${data["id"]}`).val(data["detalle"]).trigger("change");
                                });
                            }, 500);
                        })
                };

                setTimeout(() => {
                    promiseFunction();
                }, 500);
            }
        }, true);

        userDATOS.busqueda({ value: $rootScope.globals.currentUser.idprofesional, entidad: "profesional" }, function (data) {
            if(data.data !== null)  {
                target.find(`#profesional_id`).val(data.data.id).trigger("change");
                target.find(`#profesional_matricula`).val(data.data.matricula).trigger("change");
                target.find(`#profesional_duracionturno`).val(data.data.duracionturno).trigger("change");
                target.find(`#profesional_entreturno`).val(data.data.entreturno).trigger("change");
                target.find(`#profesional_detalle`).val(data.data.detalle).trigger("change");
                target.find(`#profesional_idespecializacion`).val(data.data.idespecializacion).trigger("change");
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
            html += `</div>`;//ng-class="dataOK ? 'was-validated' : ''"
            html += `<form name="formContacto" ng-submit="submit();" role="form" method="post" novalidate>`;
                html += `<div class="modal-body">`;
                    html += `<div class="row">`;
                        html += `<div class="col-6">`;
                            html += `<h3>Datos personales</h3>`;
                            html += personaPyrus.formulario_OK("","dataOK");
                        html += `</div>`;
                        html += `<div class="col-6">`;
                            html += `<h3>Domicilio</h3>`;
                            html += personaDomicilioPyrus.formulario_OK("","dataOK");
                        html += `</div>`;
                    html += `</div>`;
                    html += `<div class="row pt-4">`;
                        html += `<div class="col-6">`;
                            html += `<h3>Contacto<div class="float-right btn-group"><button ng-disabled="dataOK" addcontacto type="button" class="btn btn-sm btn-primary"><i class="fas fa-plus"></i></button><button ng-disabled="dataOK" onclick="deleteContacto()" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></div></h3>`;
                            html += `<div id="personaContacto" dynamic="personaContacto">`;
                                html += `<p class="mb-0 text-center text-muted cargando">Buscando información de contactos <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></p>`;
                            html += `</div>`;
                        html += `</div>`;
                        html += `<div class="col-6">`;
                            html += `<h3>Datos profesionales</h3>`;
                            msg = "Si no encuentró su especialización, comuniquese con el administrador del lugar para establecer los datos necesarios.";
                            html += `<div class="alert alert-primary" role="alert" style="font-size:.8em">${msg}</div>`;
                            html += profesionalPyrus.formulario_OK("","dataOK");
                        html += `</div>`;
                    html += `</div>`;
                html += `</div>`;
                html += `<div class="modal-footer w-100 d-block bg-light">`;
                    html += `<div class="row">`;
                        html += `<div class="col-6 d-flex align-items-center">`;
                            html += '<label class="m-0 d-block"><input ng-init="dataOK = false; dataLoading = false;" ng-model="dataOK" name="checkboxOK" ng-model="checkboxOK" type="checkbox" class="mr-2"/>Estoy de acuerdo en modificar estos datos</label>'
                        html += `</div>`;
                        html += `<div class="col-6 d-flex justify-content-end">`;
                            html += '<img class="mr-2" ng-if="dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />';
                            html += `<button type="submit" ng-disabled="!dataOK" class="btn btn-lg text-uppercase btn-success" id="btnConfirmar">confirmar</button>`
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
