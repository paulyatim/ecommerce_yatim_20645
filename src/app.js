const express = require('express');
const productos = require('./Routes/productos');
const carrito = require('./Routes/carrito');

const server = express();

server.use(express.json());

server.use('/api/productos', productos);
server.use('/api/carrito', carrito);

module.exports = server;