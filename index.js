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














