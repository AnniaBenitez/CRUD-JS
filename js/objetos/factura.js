let generateId= 0;
class Factura{
    constructor(fecha, cliente, vendedor, isCredito, items){
        this.id = generateId++
        this.fecha = fecha
        this.cliente = cliente
        this.vendedor = vendedor
        this.isCredito = isCredito
        this.items = items
    }
    
}
