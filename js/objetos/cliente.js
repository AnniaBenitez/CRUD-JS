let generateId= 0;
class Factura{
    constructor(nombre, ruc, direccion, telefono){
        this.id = generateId++
        this.nombre = nombre
        this.ruc = ruc
        this.direccion = direccion
        this.telefono = telefono
    }
    
}