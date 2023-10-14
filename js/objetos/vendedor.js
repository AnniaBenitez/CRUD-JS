let generateId= 0;
class Factura{
    constructor(nombre, ruc, direccion, telefono, porcentajeComision){
        this.id = generateId++
        this.nombre = nombre
        this.ruc = ruc
        this.direccion = direccion
        this.telefono = telefono
        this.porcentajeComision = porcentajeComision
    }
    
}