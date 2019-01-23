<?php

/*
 * FUNCIONES DE LO QUE UN USUARIO DESDE JS PUEDE HACER
 *
 ******************************************
 * ADVERTENCIAS: EXISTE UNA CONVENCION, EL
 * USUARIO SOLO PUEDE HACER USO DE ESTAS
 * FUNCIONES, EL LLAMADOR AGREGA EL PREFIJO
 * Y VIENEN LUEGO ACA. POR SEGURIDAD
 ******************************************
 *
 * TODAS LAS FUNCIONES RECIBEN $d (QUE ES EL DATA).
 *
 * SI EMPIEZAN CON NS_ Significa que pueden ser usado sin
 * necesidad de tener inicializada una session (NO SESSION)
 */

class PYRUS_ACTION {

    public static function createData($d) {
        $tables = R::inspect();
        $entidad = $d["entidad"];
        $ARR_attr = $d["objeto"];
        if(in_array($entidad, $tables))
            response(200, 'ok', "TABLA '{$entidad}' existente en " . CONFIG_BD);
        else {
            $aux = R::xdispense($entidad);
            foreach ($ARR_attr as $attr => $tipo) {
                if(is_null($tipo)) continue;
                $valor = "";
                if(isset(VALUE[$tipo]))
                    $valor = VALUE[$tipo];
                if($attr != "id")
                    $aux->$attr = $valor;
            }
            //print_r($aux);die();
            R::store($aux);
            R::wipe($entidad);
            response(200, 'ok', $ARR_attr);
        }
    }
    /**
     * Dado una entidad, devuelve cantidad de registros
     *
     * @param array $d array de datos generico
     */
    public static function registros($d) {
        $entidad = $d['entidad'];
        response(200,'ok ' . $entidad, PYRUS_DB::get_registros($entidad));
    }
    /** */
    public static function change($d) {
        response(200,"ok change {$d["entidad"]}", PYRUS_DB::change($d));
    }
    /** */
    public static function verProceso($d) {
        response(200,"ok proceso", PYRUS_DB::verProceso($d["idUnidad"],$d["idNoticia"]));
    }
    /** */
    public static function datatable($d) {
        $data = $_REQUEST;
        unset($data["entidad"]);
        unset($data["tipo"]);
        $entidad = $d["entidad"];
        $tipo = $d["tipo"];
        PYRUS_DB::datatable($entidad,$entidad,$data);
    }
    /**
     *
     */
    public static function search($d) {
        $entidad = $d['entidad'];
        $column = $d['column'];
        $value = $d['value'];
        $return = $d['retorno'];
        response(200,'ok ' . $entidad, PYRUS_DB::get_value($entidad,$column,$value,$return));
    }
    /**
     *
     */
    public static function search_paginado($d) {
        // print_r($d);die();
        $entidad = $d['entidad'];
        response(200,'ok ' . $entidad, PYRUS_DB::get_value_paginado($d));
    }
    /** */
    public static function totalRegistros($d) {
        response(200,'ok total registros', PYRUS_DB::get_total($d));
    }
    /**
     *
     */
    public static function unique($d) {
        $entidad = $d['entidad'];
        unset($d['entidad']);

        response(200,'ok ' . $entidad, PYRUS_DB::unique($entidad,$d));
    }
    /**
     *
     */
    public static function baja_generica($d){
        $entidad = $d['entidad'];
        $id = $d['id'];
        response(200,'ok ' . $entidad,PYRUS_DB::remove_uno($entidad,$id));
    }
    /**
     *
     */
    public static function resultados($d) {
        $entidad = $d['entidad'];
        response(200,'ok ' . $entidad, PYRUS_DB::resultados($entidad));
    }
    /** */
    public static function especificacion($d) {
        $entidad = $d['entidad'];
        if(isset(ENTIDADES[$entidad]))
            response(200,"OK ESPECIFICACIÓN {$entidad}", ENTIDADES[$entidad]);
        else
            response(300,"ESPECIFICACIÓN {$entidad} NO ENCONTRADA", false);
    }
    /** */
    public static function entidades() {
        $entidades = Array();
        foreach(ENTIDADES AS $key => $value)
            $entidades[] = $key;
        response(200,"OK ENTIDADES", $entidades);
    }
    /** */
    public static function get_uno($d) {
        $entidad = $d['entidad'];
        $column = $d["column"];
        $value = $d["value"];
        response(200,'ok ' . $entidad, PYRUS_DB::get_uno($entidad,$column,$value));
    }
    /**
     * Retorna un archivo del local en Base64
     */
    public static function base64($d) {
        $path = "../{$d["src"]}";
        $type = pathinfo($path, PATHINFO_EXTENSION);
        // echo file_get_contents($path);
        $data = base64_encode(file_get_contents($path));
        
        response(200,"Base64", "data:image/{$type};base64,{$data}");
    }
    /**
     * Guarda genericamente un objeto dado, recibe por
     * parametros la entidad a guardar, y el objeto
     * que contiene la informacion a guardar. si 'id' == -1
     * se agrega un nuevo objeto (id dentro del objeto)
     * El objeto a guardar debe declarar cada key y debe
     * coincidir con el declarado en la bd y la verificacion
     *
     * @param array $d array de datos generico
     *
     * TODO: por seguridad, algunos id deberian no poder ser
     * accedidos por todos los usuarios, si no por quien lo creo
     */
    public static function guardar_uno_generico($d){
        $entidad = $d['entidad'];
        $objeto = $d['objeto'];
        $attr = $d['attr'];
        
        response(200,'ok ' . $entidad, PYRUS_DB::set_one($entidad, $objeto, $attr));
    }

    /**
     * Recibe usuario y password, y consulta si se puede loguear
     *
     * @param array $d array de datos generico
     */
    public static function NS_login($d){
        PYRUS_SESSION::set_sesion($d["dato"]);
        response(200,'ok usuario', ['login' => true,'s_id' => session_id(),$_SESSION]);
    }

    public static function NS_logout(){
        PYRUS_SESSION::kill_sesion();
        response(200,'ok usuario','ok');
    }

    /**
     * Obtiene la informacion del usuario en la sesion
     *
     * @param array $d No necesario
     */
    public static function obtener_sesion($d){
        if(isset($_SESSION['user_osai_id']))
            response(200,'ok usuario',['estado' => 1,'session' => $_SESSION]);
        else{
            response(200,'no login, no autorizado',['estado' => 0,'s_id' => session_id()]);
        }
    }
    public static function sesion($d){
        response(200,'ok usuario',['estado' => 1,'session' => $_SESSION]);
    }
}
