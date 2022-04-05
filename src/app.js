const express = require('express');
const productos = require('./Routes/productos');
const carrito = require('./Routes/carrito');

const server = express();

server.use(express.json());

server.use('/productos', productos);
server.use('/carrito', carrito);

module.exports = server;