const http = require("http"); //uso libreria HTTP
var fs = require("fs"); //Obteniendo acceso al Sistema de Archivos
const express = require("express"); // libreria express para crear la ruta de nuestro sevidor 
const cors = require("cors");
var bodyParser = require('body-parser');
const app = express(); //creo una aplicacion (app)

const listado = require("./json/product/all.json");
const producto = require("./json/product/5678.json");
const comentarios = require("./json/product/5678-comments.json");
const publicacion = require("./json/product/publish.json");
const categorias = require("./json/category/all.json");
const categoria = require("./json/category/1234.json");
const carrito = require("./json/cart/654.json");
const mensaje = require("./json/cart/buy.json");
const { Router } = require("express");

// RUTA
app.use(express.static(__dirname + '/public')); //le decimos que este sirviendo a 
app.use(cors());
app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html"); //ruta estatica
    })
    //body parser para procesar el body de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// le marcamos una RUTA

app.get("/", function(req, res) { //req = peticiones y res =  responder
    res.send("bienvenido al servidor"); //res.send = envie respuesta
});
app.get("/products", function(req, res) { //creamos un etpoin
    res.json(listado);
});
app.get("/product-info", function(req, res) {
    res.json(producto);
});

app.get("/comments", function(req, res) {
    res.json(comentarios);
});
app.get("/publish", function(req, res) {
    res.json(publicacion);
});
app.get("/category", function(req, res) {
    res.json(categorias);
});
app.get("/category-info", function(req, res) {
    res.json(categoria);
});
app.get("/cart", function(req, res) {
    res.json(carrito);
});
app.get("/cart-buy", function(req, res) {
    res.json(mensaje);
});
//---resibo datos del form
app.post("/prueba", function(req, res) {
    res.send("El POST se hizo bien");
});

app.post('/vender', function(req, res) { //<== La primer variable contiene la solicitud
    itemStore.push(req.body);
    res.send(`pusiste el nombre ${nombre}`);

});

const servidor = http.createServer(app); //creo el servidor
const puerto = 1984; //
servidor.listen(puerto); //lo ponemos a escuchar en elpuerto
console.debug("Funcionando en puerto" + puerto);

//get recupera  
//Post enviar 
//Put modificar
// Delete borrar
//npm init