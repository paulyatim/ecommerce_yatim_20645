const express = require('express');
const server = require('./src/app');

const app = express();

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
  })

const PORT = 8080;

server.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:8080')
})

module.exports = server;