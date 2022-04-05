class Carritos {
    constructor() {
    this.carritos = [];
    this.id = 0;
    }  

    get getAll() {
        try{
            return this.carritos;
        }catch(error){
            throw new Error(`Se produjo un error: ${error.message}`);
        }
    }

    create() {
        try{
            this.id ++;
            const carritoNuevo = {
                id: this.id,
                timestamp: Date.now(),
                productos: []
            };
            this.carritos.push(carritoNuevo)
            return carritoNuevo;
        }catch(error){
            throw new Error(`No se pudo guardar el carrito: ${error.message}`)
        }
    }

    saveTo(idCarrito, producto) {
        try {
            const index = this.carritos.findIndex((carrito) => carrito.id == idCarrito);
            if (index === -1){
                console.log("Id no encontrado");
            } else{
                this.carritos[index].productos.push(producto);
                return this.carritos[index];
            }
        } catch (error) {
            throw new Error(`No se pudo guardar el producto en el carrito: ${error.message}`)
        }
    }

    getById(id){
        try {
            return this.carritos.find(carrito => carrito.id == id);
        }catch(error) {
            throw new Error(`Se produjo un error al buscar el producto ${id}: ${error.message}`);
        }
    }

    deleteById(id) {
        try {
            const index = this.carritos.findIndex((carrito) => carrito.id === id);
            if (index === -1){
                console.log("Id no encontrado");
            } else{
                this.carritos.splice(index, 1);
            }
        } catch (error) {
            throw new Error(`Se produjo un error al borrar el producto ${id}: ${error.message}`);
        }
    }

    deleteProdById(idCarrito, idProducto) {
        try {
            const indexCarrito = this.carritos.findIndex((carrito) => carrito.id == idCarrito);
            if (indexCarrito === -1){
                return false;
            } else{
                const indexProducto = this.carritos[indexCarrito].productos.findIndex((prod) => prod.id == idProducto);
                if (indexProducto === -1) {
                    return false;
                }
                this.carritos[indexCarrito].productos.splice(indexProducto, 1);
                return true;
            }
        } catch (error) {
            throw new Error(`No se pudo guardar el producto en el carrito: ${error.message}`)
        }
    }
}

module.exports = Carritos;