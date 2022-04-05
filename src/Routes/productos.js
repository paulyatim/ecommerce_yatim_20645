const {Router} = require('express');

const router = Router();
const Productos = require('./../../api/Productos.js');

const productos = new Productos();

router.get('/', (req, res) => {
    try {
        res.status(200).send(productos.getAll)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', (req, res) => {
    try {
        const admin = req.query.admin;
        if (admin === 'true') {
            productos.save(req.body)
            res.status(200).send(`producto ${productos.id} creado`)
        } else {
            res.status(401).send({error: -1, descripcion: 'ruta no autorizada'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const producto = productos.getById(id)
        if (producto) {
            res.status(200).send(producto)
        } else {
            res.status(404).send('no se encontro un producto con el id ingresado')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put("/:id", (req, res) => {
    try {
        const admin = req.query.admin;
        if (admin === 'true') {
            const id = Number(req.params.id)
            const producto = productos.getById(id)
            if (producto) {
                productos.update(id, req.body)
                res.status(200).send(`Producto ${id} modificado`)
            } else {
                res.status(404).send('no se encontro un producto con el id ingresado')
            }
        } else {
            res.status(401).send({error: -1, descripcion: 'ruta no autorizada'})
        }
    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete("/:id", (req, res) => {
    try {
        const admin = req.query.admin;
        if (admin === 'true') {
            const id = Number(req.params.id);
            const producto = productos.getById(id);
            if (producto) {
                productos.deleteById(id);
                res.status(200).send(`Producto ${id} borrado`)
            } else {
                res.status(404).send('no se encontro un producto con el id ingresado')
            }
        } else {
            res.status(401).send({error: -1, descripcion: 'ruta no autorizada'})
        }
    } catch(error){
        res.status(400).send(error)
    }
})


module.exports = router;