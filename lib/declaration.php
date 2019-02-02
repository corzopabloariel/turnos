<?php
define( "VALUE",
    [
        "TP_PK" => NULL,
        "TP_DATETIME" => date('Y-m-d H:i:s'),
        "TP_DATE" => date('Y-m-d'),
        "TP_TIME" => date('H:i:s'),
        "TP_RELACION" => 0,
        "TP_INTEGER" => 0,
        "TP_OPTION" => 0,
        "TP_STRING" => "",
        "TP_TEXT" => "",
        "TP_IMG" => "",
        "TP_FLOAT" => 0.0,
        "TP_DOUBLE" => 0.0,
        "TP_BOLEANO" => true
    ]
);
define( "ENTIDADES",
    [
        "agenda" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idprofesional" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "profesional",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "profesional",
                        "ATTR" => "id"
                    ]
                ],
                "idespecializacion" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "especialización",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "especializacion",
                        "ATTR" => "id"
                    ]
                ],
                "observacion" => [
                    "TIPO" => "TP_TEXT",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "observaciones",
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/idprofesional/ (/idespecializacion/)",
                "ATTR" => ["idprofesional","idespecializacion"]
            ]
        ],
        "ayudante" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "idpersona" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "persona",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "persona",
                        "ATTR" => "id"
                    ]
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/idpersona/",
                "ATTR" => ["idpersona"]
            ]
        ],
        "dia" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "numero" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 20,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/nombre/",
                "ATTR" => ["nombre"]
            ]
        ],
        "especializacion" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "abrev" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 5,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 100,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/nombre/ (/abrev/)",
                "ATTR" => ["nombre","abrev"]
            ]
        ],
        "localidad" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idprovincia" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "provincia",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "provincia",
                        "ATTR" => "id"
                    ]
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 150,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/idprovincia/, /nombre/",
                "ATTR" => ["idprovincia","nombre"]
            ]
        ],
        "lugar" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 100,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "NOMBRE" => "razón social",
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/nombre/",
                "ATTR" => ["nombre"]
            ]
        ],
        "lugardomicilio" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "lugar",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "idlocalidad" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "localidad",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "localidad",
                        "ATTR" => "id"
                    ]
                ],
                "calle" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 100,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "altura" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0
                ],
                "codigopostal" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 20,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "NOMBRE" => "código postal",
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/calle/ #/altura/ (/codigopostal/), /idlocalidad/",
                "ATTR" => ["calle","altura","codigopostal","idlocalidad"]
            ]
        ],
        "mes" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "numero" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "SIZE" => 20,//LONGITUD DEL STRING
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "cantidaddias" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0
                ],
                "cantidaddiasbisiesto" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/nombre/",
                "ATTR" => ["nombre"]
            ]
        ],
        "persona" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "image" => [
                    "TIPO" => "TP_IMG",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 0,
                    "NOMBRE" => "foto de perfil"
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 100,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "apellido" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 100,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "tipodocumento" => [
                    "TIPO" => "TP_OPTION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0,
                    "OPTION" => [
                        [ "id" => 1, "text" => "DNI" ],
                        [ "id" => 2, "text" => "LE" ],
                    ],
                    "NOMBRE" => "tipo de documento",
                    "UNIQUE" => 1
                ],
                "documento" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0,
                    "UNIQUE" => 1
                ],
                "fechanacimiento" => [
                    "TIPO" => "TP_DATE",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "fecha de nacimiento"
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/nombre/ /apellido/",
                "ATTR" => ["nombre","apellido"]
            ],
            "FORM" => [
                ["TEXTO" => "/id/","ATTR" => ["id"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-6'>/nombre/</div><div class='form-group col-6'>/apellido/</div></div>","ATTR" => ["nombre","apellido"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-3'>/tipodocumento/</div><div class='form-group col-4'>/documento/</div><div class='form-group col-5'>/fechanacimiento/</div></div>","ATTR" => ["tipodocumento","documento","fechanacimiento"]]
            ],
            "UNIQUE" => ["idlugar","nombre","apellido","tipodocumento","documento"]
        ],
        "personacontacto" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idpersona" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "persona",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "persona",
                        "ATTR" => "id"
                    ]
                ],
                "tipocontacto" => [
                    "TIPO" => "TP_OPTION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0,
                    "OPTION" => [
                        [ "id" => 1, "text" => "Teléfono" ],
                        [ "id" => 2, "text" => "Celular" ],
                        [ "id" => 3, "text" => "Email" ]
                    ],
                    "NOMBRE" => "tipo de contacto",
                    "UNIQUE" => 1
                ],
                "detalle" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 120,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL,
                    "UNIQUE" => 1
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/detalle/ (/tipocontacto/)",
                "ATTR" => ["detalle","tipocontacto"]
            ],
            "FUNCIONES" => [
                "tipocontacto" => [
                    "onchange" => "changeContacto(this)"
                ]
            ],
            "FORM" => [
                ["TEXTO" => "/id/ /idpersona/","ATTR" => ["id","idpersona"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-1 d-flex justify-content-center align-items-center'><input ngReadOnly type='checkbox' onchange='prepararDato(this);' /></div><div class='form-group col-4'>/tipocontacto/</div><div class='form-group col-7'>/detalle/</div></div>","ATTR" => ["tipocontacto","detalle"]]
            ],
            "UNIQUE" => ["tipocontacto","detalle"]
        ],
        "personadomicilio" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idpersona" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "persona",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "persona",
                        "ATTR" => "id"
                    ]
                ],
                "idlocalidad" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "ubicación",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "localidad",
                        "ATTR" => "id"
                    ]
                ],
                "calle" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 100,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "altura" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => 0
                ],
                "codigopostal" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 10,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL,
                    "NOMBRE" => "código postal"
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/calle/ #/altura/ (/codigopostal/). /idlocalidad/",
                "ATTR" => ["calle","altura","codigopostal","idlocalidad"]
            ],
            "FORM" => [
                ["TEXTO" => "/id/ /idpersona/","ATTR" => ["id","idpersona"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-8'>/calle/</div><div class='form-group col-4'>/altura/</div></div>","ATTR" => ["calle","altura"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-8'>/idlocalidad/</div><div class='form-group col-4'>/codigopostal/</div></div>","ATTR" => ["idlocalidad","codigopostal"]]
            ],
            "UNIQUE" => ["idlocalidad","calle","altura","codigopostal"]
        ],
        "personatipo" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idpersona" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "persona",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "persona",
                        "ATTR" => "id"
                    ]
                ],
                "idprofesional" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "profesional",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "profesional",
                        "ATTR" => "id"
                    ]
                ],
                "idayudante" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "ayudante",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "ayudante",
                        "ATTR" => "id"
                    ]
                ],
                "idusuario" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "usuario",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "usuario",
                        "ATTR" => "id"
                    ]
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/idpersona/",
                "ATTR" => ["idpersona"]
            ]
        ],
        "profesional" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "idespecializacion" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "especialización",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "especializacion",
                        "ATTR" => "id"
                    ]
                ],
                "duracionturno" => [
                    "TIPO" => "TP_TIME",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "duración del turno",
                    "DEFAULT" => "00:00"
                ],
                "entreturno" => [
                    "TIPO" => "TP_TIME",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "tiempo e/ turno",
                    "DEFAULT" => "00:00"
                ],
                "matricula" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 40,
                    "NECESARIO" => 0,
                    "NOMBRE" => "matrícula",
                    "DEFAULT" => NULL
                ],
                "detalle" => [
                    "TIPO" => "TP_TEXT",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => NULL
                ],
                "administrador" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "FORM" => [
                ["TEXTO" => "/id/","ATTR" => ["id"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-6'>/idespecializacion/</div><div class='form-group col-6'>/matricula/</div></div>","ATTR" => ["idespecializacion","matricula"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-6'>/duracionturno/</div><div class='form-group col-6'>/entreturno/</div></div>","ATTR" => ["duracionturno","entreturno"]],
                ["TEXTO" => "<div class='form-row'><div class='form-group col-12'>/detalle/</div></div>","ATTR" => ["detalle"]]
            ]
        ],
        "profesionaldia" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idprofesional" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "profesional",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "profesional",
                        "ATTR" => "id"
                    ]
                ],
                "iddia" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "día",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "dia",
                        "ATTR" => "id"
                    ]
                ],
                "horarioinicio" => [
                    "TIPO" => "TP_TIME",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "horario de comienzo",
                    "DEFAULT" => "00:00"
                ],
                "horariofin" => [
                    "TIPO" => "TP_TIME",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "horario de finalización",
                    "DEFAULT" => "00:00"
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ]
        ],
        "profesionalmes" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "year" => [
                    "TIPO" => "TP_INTEGER",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 0,
                    "NOMBRE" => "año",
                    "DEFAULT" => 1
                ],
                "idprofesional" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "profesional",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "profesional",
                        "ATTR" => "id"
                    ]
                ],
                "idmes" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "mes",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "mes",
                        "ATTR" => "id"
                    ]
                ],
                "idprofesionaldia" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "día",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "profesionaldia",
                        "ATTR" => "id"
                    ]
                ],
                "horario" => [
                    "TIPO" => "TP_TIME",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "DEFAULT" => "00:00"
                ],
                // SUMA AL HORARIO EL TIEMPO DEL TURNO - INSTANCIA
                // profesionalmes.horario + profesional.duracionTurno
                // (profesionalmes.horario + profesional.duracionTurno) * n + profesional.entreturno
                "horariofin" => NULL,
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ]
        ],
        "provincia" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "nombre" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 150,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ],
            "VISIBLE" => [
                "TEXTO" => "/nombre/",
                "ATTR" => ["nombre"]
            ]
        ],
        "usuario" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "idpersona" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "persona",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "persona",
                        "ATTR" => "id"
                    ]
                ],
                "user" => [
                    "TIPO" => "TP_STRING",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 20,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "NOMBRE" => "usuario",
                    "DEFAULT" => 0
                ],
                "pass" => [
                    "TIPO" => "TP_PASSWORD",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "SIZE" => 32,//LONGITUD DEL STRING
                    "NECESARIO" => 1,
                    "NOMBRE" => "contraseña",
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ]
        ],
        "usuarioturno" => [
            "ATRIBUTOS" => [
                "id" => [
                    "TIPO" => "TP_PK",
                    "VISIBILIDAD" => "TP_INVISIBLE",
                    "NECESARIO" => 0,
                    "DEFAULT" => "nulo"
                ],
                "autofecha" => [
                    "TIPO" => "TP_DATETIME",
                    "VISIBILIDAD" => "TP_FECHA",
                    "NECESARIO" => 0
                ],
                "idlugar" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_OCULTO",
                    "NECESARIO" => 1,
                    "NOMBRE" => "centro",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "lugar",
                        "ATTR" => "id"
                    ]
                ],
                "idusuario" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "usuario",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "usuario",
                        "ATTR" => "id"
                    ]
                ],
                "idprofesionalmes" => [
                    "TIPO" => "TP_RELACION",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "turno",
                    "DEFAULT" => 0,
                    "RELACION" => [
                        "ENTIDAD" => "profesionalmes",
                        "ATTR" => "id"
                    ]
                ],
                "observacion" => [
                    "TIPO" => "TP_TEXT",
                    "VISIBILIDAD" => "TP_VISIBLE",
                    "NECESARIO" => 1,
                    "NOMBRE" => "observaciones",
                    "DEFAULT" => NULL
                ],
                "elim" => [
                    "TIPO" => "TP_BOLEANO",
                    "VISIBILIDAD" => "TP_BANDERA",
                    "NECESARIO" => 0,
                    "DEFAULT" => 0
                ]
            ]
        ]
    ]
);
