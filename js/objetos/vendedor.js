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
    
    getID() {
        return this.id
    }

    getNombre() {
        return this.nombre
    }

    getRuc() {
        return this.ruc
    }

    getDireccion() {
        return this.direccion
    }

    getTelefono() {
        return this.telefono
    }

    getPorcentaje() {
        return this.porcentajeComision
    }

    setNombre(nombre) {
        this.nombre = nombre
    }

    getRuc(ruc) {
        this.ruc = ruc
    }

    getDireccion(direccion) {
        this.direccion = direccion
    }

    getTelefono(telefono) {
        this.telefono = telefono
    }

    getPorcentaje(porcentajeComision) {
        this.porcentajeComision = porcentajeComision
    }
}