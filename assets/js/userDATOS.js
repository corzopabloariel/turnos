/** <VARIABLES> */
Lobibox.notify.OPTIONS.error.sound = "error";
Lobibox.notify.OPTIONS.info.sound = "info";
Lobibox.notify.OPTIONS.default.sound = "default";
Lobibox.notify.OPTIONS.success.sound = "success";
Lobibox.notify.OPTIONS.warning.sound = "warning";
/** </VARIABLES> */

const translate_spanish = {
    buttons: {
        pageLength: {
            _: "%d filas",
            '-1': "Todo"
        }
    },
    "sLengthMenu": "_MENU_",
    "lengthMenu": "_MENU_",

    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "_START_ de _END_ - _TOTAL_ registros",
    "info": "_START_ de _END_ - _TOTAL_ registros",
    "sInfoEmpty": "Sin registros",
    "infoEmpty": "Sin registros disponibles", "infoFiltered": "(filtrado de _MAX_ registros)",
    "sInfoFiltered": "(total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscador: ",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "<<",
        "sLast": ">>",
        "sNext": ">",
        "sPrevious": "<"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },

    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "",
    "zeroRecords": "No se encontraron registros",
    "paginate": {
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "select": {
        //"rows": { _: "%d filas seleccionadas", 0: "", 1: "1 fila seleccionada" }
        "rows": { _: "%d filas seleccionadas", 0: "", 1: "" }
    },
};
const personaPyrus = new Pyrus("persona");
const personaDomicilioPyrus = new Pyrus("personadomicilio");
const personaContactoPyrus = new Pyrus("personacontacto");
const profesionalPyrus = new Pyrus("profesional");
const lugarPyrus = new Pyrus("lugar");

let userDATOS = {};
/**
 * Función AJAX
 * @param action STRING: acción que va a realizar
 * @param data OBJ: datos necesarios de la búsqueda, varia de fución en función
 * @param asy BOOL: true o false
 */
userDATOS.ajax = function (action, data, asy, callBackOK) {
    $.ajax({
        type: 'POST',
        url: url_query_local,
        dataType: 'json',
        async: asy,
        data: { "accion": action, "data": data }
    }).done(function (msg) {
        if (data.paginado !== undefined) {
            if (Object.keys(msg.data).length == 0)
                window[data.paginado_name]--;
        }
        callBackOK.call(this, msg);
    });
}
/**
 * Función que usa la api Lobibox
 *@param mensaje STRING: texto que aparece en la notificación
 *@param tipo STRING: permite cambiar el color a la notificación
 *@param dlay BOOL: flag para mostrar el indicador de demora
 */
userDATOS.notificacion = function (mensaje, tipo = 'info', delayIndicator = true, size = 'mini', delay = 2500) {
    // Available types 'default', 'warning', 'info', 'success', 'error'
    // Available size 'normal', 'mini', 'large'
    if (mensaje == "") return false;
    let types = { 'default': "", 'warning': "Precaución", 'info': "Información", 'success': "Completo", 'error': "Error" };
    if (types[tipo] === undefined) {
        console.log("Tipo erroneo");
        return false;
    }
    let data = {
        'size': size,
        'icon': true,
        'iconSource': 'fontAwesome',
        'delayIndicator': delayIndicator,
        'delay': delay,
        'title': types[tipo],
        'showClass': 'fadeInDown',
        'hideClass': 'fadeUpDown',
        'msg': mensaje,
        'soundPath': 'assets/sounds/',
        'soundExt': '.ogg',
        'onClickUrl': null,
        'sound': true
    };
    Lobibox.notify(tipo, data);
};
/**
 * Función para la búsqueda directo en la BD
 * @param value: valor a buscar
 * @param tabla STRING: tabla donde buscar
 * @param asy BOOL: Sincrónico / Asincrónico
 * @param colum STRING: columna específica - default ID
 * @param retorno INT: cantidad a retornar - != 1 :: TODO
 */
userDATOS.busqueda = function (values, callBackOK, asy = false) {
    let data = {
        "value": values.value,
        "entidad": values.entidad,
        "column": (values.column !== undefined ? values.column : "id"),
        "retorno": (values.retorno !== undefined ? values.retorno : 1)
    };
    userDATOS.ajax("search", data, asy, callBackOK);
}
/**
 * Valida el formulario con elemento required y visible
 * @param t STRING: elemento donde se busca la info
 */
userDATOS.validar = function (t, marca = true, visible = true) {
    let flag = 1;
    $(t).find('*[required="true"]').each(function () {
        if ($(this).is(":visible")) {
            if ($(this).is(":invalid") || $(this).val() == "") {
                flag = 0;
                // if (marca) $(this).addClass("has-error");
            }
        }
    });
    return flag;
};
/** */
userDATOS.encodeBase64 = function( src ) {
    let _r = null;
    userDATOS.ajax("base64", {src : src }, false, function(data) {
        _r = data.data;
    });
    return _r;
}
/** */
userDATOS.select2 = function(target) {
    $(target).select2({ theme: "bootstrap4", width: 'resolve' });
}
/** */
const imgLoading = userDATOS.encodeBase64("assets/image/loading.1.gif", "gif");
/** */
userDATOS.vistaProfesional = function(target, lugar) {
    if(lugar == "home") {
        html = "";
        html += "<div class='container py-4'>";
            html += "<div class='card'>";
                html += "<div class='card-header bg-dark-accent color-light-shades font-1_5'>";
                    html += "<i class='far fa-clock'></i> Turnos del día 15/01";
                html += "</div>";
                html += "<div class='card-body'>";//bg-main-brand color-light-shades
                    html += "<table id='table' class='table table-borderless table-striped mb-0 w-100'>";
                    html += "</table>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        target.html(html);
        userDATOS.dataTable($("#table"),{ tipo:"turnos_dia", entidad: "usuarioturno"});
    } else if(lugar == "misDatos") {
        user = JSON.parse(sessionStorage.user);

        profesional = profesionalPyrus.mostrar_1(user.idprofesional);
        lugar = lugarPyrus.mostrar_1(user.idlugar);
        personaNombre = personaPyrus.mostrar_1(user.idpersona);
        personaDocumento = personaPyrus.mostrar_1(user.idpersona, "id", { TEXTO: "/tipodocumento/ /documento/", ATTR: ["tipodocumento", "documento"] });
        personaFecha = personaPyrus.mostrar_1(user.idpersona, "id", { TEXTO: "/fechanacimiento/", ATTR: ["fechanacimiento"] });

        total = 1;
        datosNecesarios = [];
        html = "";
        html += "<div class='container py-4'>";
            html += "<div class='row'>";
                html += "<div class='col-12'>";
                    if(lugar !== null)
                        html += `<p>Lugar: ${lugar}</p>`;
                    else
                        html += `<p>Sin lugar registrado</p>`;
                html += "</div>";
            html += "</div>";
            html += "<div class='row' id='divEstadoDatos'>";
                html += `<img class="d-block mx-auto w-50 h-50 mb-3" src="${imgLoading}" />`;
            html += "</div>";
            html += "<div class='row'>";
                html += "<div class='col-6'>";
                    html += "<div class='card'>";
                        html += "<div class='card-header bg-dark-accent color-light-shades font-1_5'>";
                            html += "<i class='fas fa-user-cog'></i> Datos personales";
                        html += "</div>";
                        html += "<div class='card-body'>";//bg-main-brand color-light-shades
                            html += '<div class="text-center mb-3">';
                                html += '<button type="button" onclick="editarPersonal();" class="button border-radius cursor-pointer btn-warning d-inline-block position-relative text-uppercase">';
                                    html += 'editar';
                                    html += '<div></div>';
                                    html += '<i class="fas fa-pen"></i>';
                                html += '</button>';
                            html += '</div>';
                            html += `<p><strong class="mr-2">Nombre</strong><span class="float-right">${personaNombre}</span></p>`;
                            html += `<p class=''><strong class='mr-2'>Documento</strong> <span class='float-right'>${personaDocumento}</span></p>`;
                            html += `<p class='mb-0'><strong class='mr-2'>F. Nacimiento</strong><span class='float-right'>${personaFecha}</span></p>`;
                            html += "<hr/>";
                            if(profesional.duracionturno === null) {
                                total -= .15;
                                datosNecesarios.push("Duración del turno (15%)");
                                html += "<p class=''><strong class='mr-2'>Duración</strong><span class='text-muted float-right'>sin especificar</span></p>";
                            } else {

                            }
                            if(profesional.entreturno === null) {
                                total -= .15;
                                datosNecesarios.push("Tiempo e/ sesiones (15%)");
                                html += "<p class=''><strong class='mr-2'>Tiempo e/ sesión</strong><span class='text-muted float-right'>sin especificar</span></p>";
                            } else {
                                
                            }
                            html += "<hr/>";
                            if(profesional.matricula === null) {
                                total -= .2;
                                datosNecesarios.push("Matrícula (20%)")
                                html += "<p class=''><strong class='mr-2'>Matrícula</strong><span class='text-muted float-right'>sin especificar</span></p>";
                            } else {
                                
                            }
                            if(parseInt(profesional.idespecializacion) == 0) {
                                total -= .1;
                                datosNecesarios.push("Especialización (10%)");
                                html += "<p class='mb-0'><strong class='mr-2'>Especialización</strong><span class='text-muted float-right'>sin especificar</span></p>";
                            } else {
                                
                            }
                            if(profesional.detalle !== null) {
                                html += "<hr/>";
                                html += `<p class="mb-0">${profesional.detalle}</p>`;
                            } else {
                                total -= .07;
                                datosNecesarios.push("Breve descripción (7%)");
                            }
                        html += "</div>";
                        html += "<div id='cardFooterContacto' class='card-footer bg-light-accent color-light-shades'>";
                            html += '<img class="d-block mx-auto" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />';
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='col-6'>";
                    html += "<div class='card'>";
                        html += "<div class='card-header bg-main-brand color-light-shades font-1_5'>";
                            html += "<i class='fas fa-calendar-week'></i> Mi semana";
                        html += "</div>";
                        html += "<div class='card-body'>";//bg-main-brand color-light-shades
                            html += '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
                                html += '<h4 class="alert-heading">La semana';
                                    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
                                        html += '<span aria-hidden="true">&times;</span>';
                                    html += '</button>';
                                html += '</h4>';
                                html += '<p class="">Agregue días a su semana para generar el calendario. Los días son un rango de horas establecido.<p>';
                                html += "<hr/>";
                                html += '<p class="mb-0">Una vez cargado los dias, la duración y espacio entre sesiones, el sistema mostrará la información segmentada en turnos.</p>'
                            html += '</div>';
                            html += '<div class="text-center mb-3">';
                                html += '<button class="button border-radius cursor-pointer btn-primary d-inline-block position-relative text-uppercase">';
                                    html += 'Agregar';
                                    html += '<div></div>';
                                    html += '<i class="fas fa-plus"></i>';
                                html += '</button>';
                            html += '</div>';
                            html += "<p class=''>Lunes - 08:00 a 15:00 y 17:00 a 20:00</p>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        target.html(html);

        userDATOS.busqueda({ entidad: "personacontacto", value: user.idpersona, column: "idpersona", retorno: 0 }, function (data) {
            t = $("#cardFooterContacto");
            html = "<h3>Contacto</h3>";
            if(data.data === null) {
                total -= .1;
                datosNecesarios.push("Algún contacto (10%)");
                html += "<p class='mb-0'><span class='text-muted'>Sin especificar</span></p>";
            } else {
                html += "<ul class='list-group color-dark-shades'>";
                tipoContacto = {'1':'<i class="fas fa-phone mr-2"></i>', '2':'<i class="fas fa-mobile-alt mr-2"></i>','3':'<i class="fas fa-at mr-2"></i>'};
                for(var x in data.data) {
                    html += `<li class="list-group-item">${tipoContacto[data.data[x].tipocontacto] + personaContactoPyrus.mostrar_1(x)}</li>`;
                }
                html += "</ul>";
            }
            

            html += "<h3 class='mt-3'>Domicilio</h3>";
            personaDomicilio = personaDomicilioPyrus.mostrar_1(user.idpersona,"idpersona");
            if (personaDomicilio == "") {
                total -= .03;
                datosNecesarios.push("Domicilio (3%)");
                html += "<p class='mb-0'><span class='text-muted'>Sin especificar</span></p>";
            } else
                html += `<p class="mb-0"><i class="fas fa-map-marker-alt mr-2 color-dark-accent"></i>${personaDomicilio}</p>`;
            t.html(html);
            
            if(total != 1) {
                hh = "";
                porcentaje = ((1 - total) * 100).toFixed(0);
                tt = $("#divEstadoDatos");
                
                hh += '<div class="col pb-3">';
                    hh += '<div class="w-100 alert alert-danger alert-dismissible fade show" role="alert">';
                        hh += `<h4 class="alert-heading">Porcentaje para completar su perfil: ${porcentaje}%`;
                            hh += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
                                hh += '<span aria-hidden="true">&times;</span>';
                            hh += '</button>';
                        hh += `</h4>`;
                        hh += `<p class="mb-0">${datosNecesarios.join("; ")}</p>`;
                    hh += '</div>';
                hh += '</div>';
                
                tt.html(hh);
            }
        }, true );
    }
}

/** */
userDATOS.dataTable = function(target,data) {
    let nombre_tabla = "tabla_" + data.tipo;
    let pyrus = new Pyrus(data.entidad);
    let column = pyrus.columnaDT;
    let order = pyrus.order;
    let ARR_btn = [];
    window[nombre_tabla] = $(target).DataTable({
        "processing": true,
        "pageLength": 10,
        "serverSide": true,
        "paging": true,
        "lengthChange": true,
        "responsive": true,
        "ajax": {
            "method": "POST",
            "url": url_query_local,
            "data": { accion: "datatable", data: data }
        },
        "columns": column,
        "columnDefs": order,
        "fixedHeader": {
            header: false,
        },
        "select": 'single',
        "destroy": true,
        "order": [[0, "desc"]],
        // "searching": searching,
        // "dom": 'lBfrtip',
        "dom": "<'row'<'col-6'i><'col-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-12 searchStyle'p>>",
        "scrollX": true,
        "lengthMenu": [[10, 25, 50], [10, 25, 50]],
        "buttons": ARR_btn,
        "language": translate_spanish
    });
}

/**
 * Función para el formato de fechas
 * @param d DATE: variable tipo DATE [CUIDADO - si la fecha es formato corto, completar con "0"]
 * @param flagSecond INT: flag para retornar con segundos
 * @param flagMinute INT: flag para retornar con Hora y minutos
 * @param formato STRING: disposición de elementos de la fecha
 * ***
 * @return COMPARE -1 if a < b
 * @return COMPARE 0 if a = b
 * @return COMPARE 1 if a > b
 */
const dates = {
    string: function (d = new Date(), flagSecond = 1, flagMinute = 1, formato = "ddmmaaaa") {
        day = (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
        month = d.getMonth() + 1;//los meses [0 - 11]
        month = (month < 10 ? "0" + month : month);
        year = d.getFullYear();
        if (flagSecond) {
            hour = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours());
            minute = (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
            second = (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
            if (formato == "ddmmaaaa")
                return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
            if (formato == "aaaammdd")
                return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        } else if (flagMinute) {
            hour = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours());
            minute = (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
            if (formato == "ddmmaaaa")
                return day + "/" + month + "/" + year + " " + hour + ":" + minute;
            if (formato == "aaaammdd")
                return year + "-" + month + "-" + day + " " + hour + ":" + minute;
        } else {
            if (formato == "ddmmaaaa")
                return day + "/" + month + "/" + year;
            if (formato == "aaaammdd")
                return year + "-" + month + "-" + day;
        }
    },
    convert: function (d) {
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                NaN
        );
    },
    compare: function (a, b) {
        return ((a.getTime() === b.getTime()) ? 0 : ((a.getTime() > b.getTime()) ? 1 : - 1));
    }
}