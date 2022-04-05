const {Router} = require('express');

const router = Router();
const Carritos = require('./../../api/Carritos.js');

const carritos = new Carritos();

router.get('/', (req, res) => {
    try {
        res.status(200).send(carritos.getAll)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', (req, res) => {
    try {
        carritos.create();
        res.status(200).send(`carrito ${carritos.id} creado`)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const carrito = carritos.getById(id);
        if (carrito) {
            carritos.deleteById(id);
            res.status(200).send(`Carrito ${id} borrado`)
        } else {
            res.status(404).send('no se encontro un carrito con el id ingresado')
        }
    } catch(error){
        res.status(400).send(error)
    }
})

router.get('/:id/productos', (req, res) => {
    try {
        const id = Number(req.params.id)
        const carrito = carritos.getById(id)
        if (carrito) {
            const productos = carrito.productos
            res.status(200).send(productos)
        } else {
            res.status(404).send('no se encontro un carrito con el id ingresado')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/:id/productos', (req, res) => {
    try {
        const id = Number(req.params.id);
        const carrito = carritos.getById(id);
        if (carrito) {
            const prodAgregado = carritos.saveTo(id, req.body)
            res.status(200).send(`producto ${prodAgregado.id} agregado al carrito ${id}`)
        } else {
            res.status(404).send('no se encontro un carrito con el id ingresado')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/:idCarrito/productos/:idProducto", (req, res) => {
    try {
        const idCarrito = Number(req.params.idCarrito);
        const carrito = carritos.getById(idCarrito);
        if (carrito) {
            const idProducto = Number(req.params.idProducto);
            const deleted = carritos.deleteProdById(idCarrito, idProducto)
            if (deleted) {
                res.status(200).send(`Producto ${idProducto} borrado del carrito ${idCarrito}`)
            } else {
                res.status(404).send('no se encontro un producto con el id ingresado')
            }
        } else {
            res.status(404).send('no se encontro un carrito con el id ingresado')
        }
    } catch(error){
        res.status(400).send(error)
    }
})

module.exports = router;