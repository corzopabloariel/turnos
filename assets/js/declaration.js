/**********************
 * VISTA O VISIBILIDAD
 **********************/
/**
 * TP_INVISIBLE: Declara que el elemento es invisible en las vistas. En FORMS
 * aparece como HIDDEN; en TABLE queda como oculto
 ** 
 * TP_FECHA: Declara que el elemento es invisible en todos los lados. Es para
 * registros de fechas TIMESTAMP
 **
 * TP_BANDERA: Declara que el elemento es oculto en FORMS, y TABLES. Es para 
 * elementos que cambian de estado
 **
 */
const VALORES = {
    TP_PK: null,
    TP_DATETIME: new Date(),
    TP_TIME: new Date(),
    TP_RELACION: 0,
    TP_STRING: "",
    TP_TEXT: "",
    TP_INTEGER: 0,
    TP_OPTION: 0,
    TP_FLOAT: 0.0,
    TP_DOUBLE: 0.0,
    TP_BOLEANO: true
};
const ENTIDADES = {
    persona: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idPersonaFisica: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'persona física',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'personafisica',
                    ATTR: 'id'
                }
            },
            idPersonaJuridica: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'persona jurídica',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'personajuridica',
                    ATTR: 'id'
                }
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    personafisica: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            nombre: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            apellido: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            tipoDocumento: {
                TIPO: 'TP_OPTION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0,
                OPTION: [
                    { id: 1, text: 'DNI' },
                    { id: 2, text: 'LE' },
                ],
                NOMBRE: 'tipo de documento',
                UNIQUE: 1
            },
            documento: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0,
                UNIQUE: 1
            },
            fechaNacimiento: {
                TIPO: 'TP_FECHA',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    personajuridica: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            razonSocial: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null,
                NOMBRE: 'razón social',
                UNIQUE: 1
            },
            cuil: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0,
                UNIQUE: 2
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    personacontacto: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idPersona: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'persona',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'persona',
                    ATTR: 'id'
                }
            },
            mail: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null,
                UNIQUE: 1
            },
            telefono: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null,
                NOMBRE: 'teléfono',
                UNIQUE: 2
            },
            celular: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null,
                UNIQUE: 3
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    personadomicilio: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idPersona: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'persona',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'persona',
                    ATTR: 'id'
                }
            },
            idLocalidad: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'ubicacion',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'localidad',
                    ATTR: 'id'
                }
            },
            calle: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            altura: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0
            },
            codigoPostal: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null,
                NOMBRE: 'código postal'
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    profesional: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idPersona: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'persona',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'persona',
                    ATTR: 'id'
                }
            },
            idEspecializacion: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'especialización',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'especializacion',
                    ATTR: 'id'
                }
            },
            duracionTurno: {
                TIPO: 'TP_TIME',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'duración del turno',
                DEFAULT: '00:00'
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    profesionaldia: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idProfesional: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'profesional',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'profesional',
                    ATTR: 'id'
                }
            },
            idDia: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'día',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'dia',
                    ATTR: 'id'
                }
            },
            horarioInicio: {
                TIPO: 'TP_TIME',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'horario de comienzo',
                DEFAULT: '00:00'
            },
            horarioFin: {
                TIPO: 'TP_TIME',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'horario de finalización',
                DEFAULT: '00:00'
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    profesionalmes: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            did: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 1
            },
            idProfesional: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'profesional',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'profesional',
                    ATTR: 'id'
                }
            },
            idMes: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'mes',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'mes',
                    ATTR: 'id'
                }
            },
            idProfesionalDia: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'día',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'profesionaldia',
                    ATTR: 'id'
                }
            },
            horario: {
                TIPO: 'TP_TIME',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: '00:00'
            },
            // SUMA AL HORARIO EL TIEMPO DEL TURNO - INSTANCIA
            // profesionalmes.horario + profesional.duracionTurno
            horarioFin: null,
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    localidad: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idProvincia: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'provincia',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'provincia',
                    ATTR: 'id'
                }
            },
            nombre: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    provincia: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            nombre: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    dia: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            numero: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0
            },
            nombre: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    mes: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            numero: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0
            },
            nombre: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            cantidadDias: {
                TIPO: 'TP_INTEGER',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: 0
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    especializacion: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            nombre: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                DEFAULT: null
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    usuario: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idPersona: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'persona',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'persona',
                    ATTR: 'id'
                }
            },
            user: {
                TIPO: 'TP_STRING',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'usuario',
                DEFAULT: 0
            },
            pass: {
                TIPO: 'TP_PASSWORD',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'contraseña',
                DEFAULT: null
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    },
    usuarioTurno: {
        ATRIBUTOS: {
            id: {
                TIPO: 'TP_PK',
                VISIBILIDAD: 'TP_INVISIBLE',
                NECESARIO: 0,
                DEFAULT: 'nulo'
            },
            autofecha: {
                TIPO: 'TP_DATETIME',
                VISIBILIDAD: 'TP_FECHA',
                NECESARIO: 0
            },
            idUsuario: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'usuario',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'usuario',
                    ATTR: 'id'
                }
            },
            idProfesionalMes: {
                TIPO: 'TP_RELACION',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'turno',
                DEFAULT: 0,
                RELACION: {
                    ENTIDAD: 'profesionalmes',
                    ATTR: 'id'
                }
            },
            observacion: {
                TIPO: 'TP_TEXT',
                VISIBILIDAD: 'TP_VISIBLE',
                NECESARIO: 1,
                NOMBRE: 'observaciones',
                DEFAULT: null
            },
            elim: {
                TIPO: 'TP_BOLEANO',
                VISIBILIDAD: 'TP_BANDERA',
                NECESARIO: 0,
                DEFAULT: 0
            }
        }
    }
};