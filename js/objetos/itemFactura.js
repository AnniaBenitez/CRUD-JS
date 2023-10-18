
class itemFactura{
    constructor(cantidad, descripcion, precio, subtotal){
        this.cantidad = cantidad
        this.descripcion = descripcion
        this.precio = precio
        this.subtotal = subtotal
    }

    getCantidad() {
        return this.cantidad
    }

    getDescripcion() {
        return this.descripcion
    }

    getFecha() {
        return this.fecha
    }

    getSubtotal() {
        return this.subtotal
    }

    setCantidad(cantidad) {
        this.cantidad = cantidad
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion
    }

    setFecha(fecha) {
        this.fecha = fecha
    }

    setSubtotal(subtotal) {
        this.subtotal = subtotal
    }
    
}