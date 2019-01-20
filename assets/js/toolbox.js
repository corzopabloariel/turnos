const url_query_local = "lib/query.php";
/**
 * Funcion de consulta desde JS, se comunica con el servidor
 * y devuelve una respuesta acorde, uso generico.
 * Las funciones de callback solo conocen la respuesta en
 * data, no el contexto de como fue recibido (ni estado, ni
 * mensaje)
 *
 * @return {undefined}
 */
const query = function(accion, data, callbackOK, asy = true,callbackFail = null) {
    window.con = $.ajax({
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: url_query_local,
        async: asy,
        data: { "accion": accion, "data": data },
        success: function(msg) {
            devolucion = JSON.parse(msg);
            callbackOK(devolucion['data']);
        },
        error: function(err) {
            if(!callbackFail)
                callbackFail(err);
        }
    });
}
