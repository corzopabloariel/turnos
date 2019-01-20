<?php

/**
 * INICIALIZADOR DEL SISTEMA:
 * Se hacen las declaraciones iniciales, y los llamados
 * a todos los requirimentos del sistema como de la
 * configuracion.
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// sistema - requisitos externos y frameworks
require_once './ext/rb.php';                    // redbeans orm
// sistema - core y herramientas
require_once __DIR__ . '/db.php';               // base de datos
require_once __DIR__ . '/declaration.php';      // entidades del sistema
require_once __DIR__ . '/toolbox.php';          // caja de herramientas
require_once __DIR__ . '/actions.php';          // acciones genericas
require_once __DIR__ . '/session.php';          // sessiones
// configuraciones
require_once './config.php';                    // configuraciones varias

PYRUS_DB::init();
PYRUS_SESSION::init();
