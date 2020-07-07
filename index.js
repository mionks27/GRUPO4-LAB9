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

app.get("/centrosPoblados/get", function (request, response) {
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
