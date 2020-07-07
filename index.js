'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8080, function(){
    console.log("servidor levantado exitosamente");
});

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

app.post("/sitios/create", function(request, response){
    var codigoSitio = request.body.codigoSitio;
    var idCentroPoblado = request.body.idCentroPoblado;
    var latitud = request.body.latitud;
    var longitud = request.body.longitud;
    var query = "INSERT INTO `inventariotest`.`sitios` (`codigoSitio`, `idCentroPoblado`, `latitud`, `longitud`) VALUES (?, ?, ?, ?)";
    var parametros = [codigoSitio, idCentroPoblado, latitud, longitud];

    conn.query(query, parametros, function(err, resultado){
        if(err){
            console.log(err);
        }else{
            var query2 = "SELECT * FROM `inventariotest`.`centrospoblados` where idCentroPoblado = ?";
            var parametros2 = [idCentroPoblado];
            conn.query(query2, parametros2, function(err2, res2){
                if(err2){
                    console.log(err2);
                }else{
                    var res = {
                        codigoSitio: codigoSitio,
                        idCentroPoblado: idCentroPoblado,
                        latitud: latitud,
                        longitud: longitud,
                        idSitio: resultado.insertId,
                        nombreCentroPoblado: res2[0].nombreCentroPoblado
                    };
                    response.json(res);
                }
            });

        }
    });
});

app.post("/equipos/create", function(request, response){
    var nombreEquipo = request.body.nombreEquipo;
    var idCategoriaEquipo = request.body.idCategoriaEquipo;
    var serialNumber = request.body.serialNumber;
    var modelo = request.body.modelo;
    var idSitio = request.body.idSitio;
    var query = "INSERT INTO `inventariotest`.`equipos` (`nombreEquipo`, `idCategoriaEquipo`, `serialNumber`, `modelo`, `idSitio`) VALUES (?, ?, ?, ?, ?)";
    var parametros = [nombreEquipo, idCategoriaEquipo, serialNumber, modelo, idSitio];
    conn.query(query, parametros, function(err, resultado){
        if(err){
            console.log(err);
        }else{
            var res = {
                idEquipo: resultado.insertId,
                nombreEquipo: nombreEquipo,
                idCategoriaEquipo: idCategoriaEquipo,
                serialNumber: serialNumber,
                modelo: modelo,
                idSitio: idSitio
            }
            response.json(res);
        }
    });
});

app.post("/equipos/create", function(request, response){
    var nombreEquipo = request.body.nombreEquipo;
    var idCategoriaEquipo = request.body.idCategoriaEquipo;
    var serialNumber = request.body.serialNumber;
    var modelo = request.body.modelo;
    var idSitio = request.body.idSitio;
    var query = "INSERT INTO `inventariotest`.`equipos` (`nombreEquipo`, `idCategoriaEquipo`, `serialNumber`, `modelo`, `idSitio`) VALUES (?, ?, ?, ?, ?)";
    var parametros = [nombreEquipo, idCategoriaEquipo, serialNumber, modelo, idSitio];
    conn.query(query, parametros, function(err, resultado){
        if(err){
            console.log(err);
        }else{
            var res = {
                idEquipo: resultado.insertId,
                nombreEquipo: nombreEquipo,
                idCategoriaEquipo: idCategoriaEquipo,
                serialNumber: serialNumber,
                modelo: modelo,
                idSitio: idSitio
            }
            response.json(res);
        }
    });
});