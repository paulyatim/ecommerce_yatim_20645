class Productos {
    constructor() {
    this.productos = [];
    this.id = 0;
    }  

    get getAll() {
        try{
            return this.productos;
        }catch(error){
            throw new Error(`Se produjo un error al recibir los productos: ${error.message}`);
        }
    }

    save(producto) {
        try{
            this.id ++;
            const productoNuevo = {
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                id: this.id,
                timestamp: Date.now(),
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                stock: producto.stock
            };
            this.productos.push(productoNuevo)
            return productoNuevo;
        }catch(error){
            throw new Error(`No se pudo guardar el producto: ${error.message}`)
        }
    }

    getById(id){
        try {
            return this.productos.find(producto => producto.id == id);
        }catch(error) {
            throw new Error(`Se produjo un error al buscar el producto ${id}: ${error.message}`);
        }
    }

    update(id, body){
        try {
            const producto = {
                nombre: body.nombre,
                precio: body.precio,
                imagen: body.imagen,
                id: id,
                timestamp: Date.now(),
                descripcion: body.descripcion,
                codigo: body.codigo,
                stock: body.stock
            } ;
            const index = this.productos.findIndex((producto) => producto.id == id);
            this.productos[index] = producto;
            return producto;
        } catch (error) {
            throw new Error(`Se produjo un error al actualizar el producto ${id}: ${error.message}`);
        }
    }

    deleteById(id) {
        try {
            const index = this.productos.findIndex((producto) => producto.id === id);
            if (index === -1){
                console.log("Id no encontrado");
            } else{
                this.productos.splice(index, 1);
            }
        } catch (error) {
            throw new Error(`Se produjo un error al borrar el producto ${id}: ${error.message}`);
        }
    }
}

module.exports = Productos;