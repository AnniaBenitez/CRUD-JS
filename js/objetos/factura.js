
class factura{
    constructor(id, fecha, cliente, vendedor, isCredito, items){
        this.id = id
        this.fecha = fecha
        this.cliente = cliente
        this.vendedor = vendedor
        this.isCredito = isCredito
        this.items = items
    }
    
    getID() {
        return this.id
    }

    getFecha() {
        return this.fecha
    }

    getCliente() {
        return this.cliente.getNombre
    }

    getVendedor() {
        return this.vendedor.getNombre
    }

    getIsCredito() {
        return this.isCredito
    }

    getItems() {
        return this.items
    }

    setFecha(fecha) {
        this.fecha = fecha
    }

    setCliente(cliente) {
        this.cliente = cliente
    }

    setVendedor(vendedor) {
        this.vendedor = vendedor
    }

    setIsCredito(isCredito) {
        this.isCredito = isCredito
    }

    setItems(items) {
        this.items = items
    } 
}
