let generateId= 0;
class Factura{
    constructor(nombre, ruc, direccion, telefono){
        this.id = generateId++
        this.nombre = nombre
        this.ruc = ruc
        this.direccion = direccion
        this.telefono = telefono
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

    setNombre(nombre) {
        this.nombre = nombre 
    }

    setRuc(ruc) {
        this.ruc = ruc
    }

    setDireccion(direccion) {
        this.direccion = direccion
    }

    setTelefono(telefono) {
        this.telefono = telefono
    }    
}

