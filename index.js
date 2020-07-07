'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "inventariotest"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión exitosa a base de datos");
    }
});


app.get("/centrosPoblados/get/", function (request, response) {
    var query = "SELECT * FROM inventariotest.centrospoblados";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});


app.get("/centrosPoblados/get/:id", function (request, response) {
        var idCentroPoblado = request.params.id;
        var query = "SELECT * FROM inventariotest.centrospoblados where idCentroPoblado =?";
        var parametros = [idCentroPoblado];
        conn.query(query, parametros, function (err, resultado) {
            if (err) {
                console.log(err);
            } else {
                response.json(resultado);
            }
        });
});

app.post("/centrosPoblados/create", function (request, response) {
    var nombreCentroPoblado = request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
    console.log(request.body);
    var query = "INSERT INTO `inventariotest`.`centrospoblados` (`nombreCentroPoblado`, `ubigeo`) VALUES (?, ?)";
    var parametros = [nombreCentroPoblado,ubigeo];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            console.log(resultado);
            var jsonRespuesta =
                {
                    "idCentroPoblado": resultado.insertId,
                    "nombreCentroPoblado": nombreCentroPoblado,
                    "ubigeo": ubigeo
                }
            ;
            response.json(jsonRespuesta);

        }
    });
});


app.post("/centrosPoblados/update", function (request, response) {
    var idCentroPoblado = request.body.idCentroPoblado;
    var nombreCentroPoblado = request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
    console.log(request.body);
    var query = "UPDATE `inventariotest`.`centrospoblados` SET `nombreCentroPoblado` = ?, `ubigeo` = ? WHERE (`idCentroPoblado` = ?)";
    var parametros = [nombreCentroPoblado,ubigeo,idCentroPoblado];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            var jsonRespuesta =
                {
                    "idCentroPoblado": idCentroPoblado,
                    "nombreCentroPoblado": nombreCentroPoblado,
                    "ubigeo": ubigeo
                }
            ;
            response.json(jsonRespuesta);

        }
    });

});

app.get("/sitios/get/:id", function (request, response) {
    var idSitio = request.params.id;
    var query = "SELECT * FROM inventariotest.sitios where idSitio = ?";
    var query2 = "SELECT * FROM inventariotest.equipos where idSitio = ?";

    var parametros = [idSitio];
    var parametros2 = [idSitio];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            conn.query(query2, parametros2, function (err2, resultado2) {
                if (err) {
                    console.log(err2);
                } else {
                    var query3 = "SELECT * FROM inventariotest.centrospoblados where idCentroPoblado = ?";
                    var parametro3 = [resultado[0].idCentroPoblado];
                    conn.query(query3, parametro3, function (err3, resultado3) {
                        if (err) {
                            console.log(err3);
                        } else {
                            console.log(resultado3);
                            var jsonRespuesta =
                                {
                                    "codigoSitio": resultado[0].codigoSitio,
                                    "idCentroPoblado": resultado[0].idCentroPoblado,
                                    "latitud": resultado[0].latitud,
                                    "longitud": resultado[0].longitud,
                                    "idSitio": resultado[0].idSitio,
                                    "nombreCentroPoblado": resultado3[0].nombreCentroPoblado,
                                    "cantidadEquipos": resultado2.length,
                                    "equipos": resultado2

                                };
                            response.json(jsonRespuesta);
                        }
                    });
                }
            });
        }
    });
});



//localhost:8080/categoriasEquipo/get/{id}
app.get("/categoriasEquipo/get/:id",function (request,response) {
    var id = request.params.id;
    var query1 = "select * from categoriaequipo";
    var query2 = "select * from categoriaequipo c where c.idCategoriaEquipo = ?";
    var parametro = id;

    if(id == null){
        conn.query(query1,function (err,resultado) {
            if (err){
                console.log(err);
            }else {
                response.json(resultado);
            }
        })
    }else {
        conn.query(query2,parametro,function (err,resultado) {
            if (err){
                console.log(err);
            }else {
                response.json(resultado);
            }
        })
    }

})

app.listen(8080,function () {
    console.log("servidor levantado exitosamente");
})



