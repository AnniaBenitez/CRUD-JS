const newCliente = document.getElementById("new")
const botonAdd = document.getElementById("new_cliente")
let clientes = JSON.parse(localStorage.getItem("clientes")) || []
const btn_crear = document.getElementById("guardar_cliente")
const btnCancelar = document.getElementById("cerrar")
const btnCancelar2 = document.getElementById("cerrar2")
const form_cliente = document.getElementById("form_new_cliente")
const listado = document.getElementById("tabla")
const btnVolverAtras = document.getElementById('atras')
const btnBorrarCliente = document.getElementById('borrar')
const btnEditarCliente = document.getElementById('editar')
const saveEditBtn = document.getElementById('guardar_editado')

btnVolverAtras.addEventListener("click", ()=>{
    window.location="home.html"
})

botonAdd.addEventListener("click", ()=>{
    newCliente.style.display = "block"
    btn_crear.style.display = "block"
    saveEditBtn.style.display = "none"
})

btnCancelar.addEventListener("click", ()=>{
    cerrar_ventana()
})

btnCancelar2.addEventListener("click", ()=>{
    cerrar_ventana()
})

fnActualizarTabla()
function fnActualizarTabla(){

    const listado = document.getElementById("tabla")

    if(clientes.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen Clientes...</tr></table>';
        return;    
    }

    const buff = [];
    buff.push('<table class="table table-stripe">');
    buff.push(' <thead>');
    buff.push('    <tr>');
    buff.push('      <th>Id</th>');
    buff.push('      <th>Nombre</th>');
    buff.push('      <th>Ruc</th>');
    buff.push('      <th>Direccion</th>');
    buff.push('      <th>Telefono</th>');
    buff.push('      <th>Borrar</th>');
    buff.push('      <th>Editar</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< clientes.length; i++){
        const tmpUser = clientes[i];

        buff.push('<tr>');
        buff.push('<td>'+ tmpUser.id +'</td>');
        buff.push('<td>'+ tmpUser.nombre +'</td>');
        buff.push('<td>'+ tmpUser.ruc + '</td>');
        buff.push('<td>'+ tmpUser.direccion +'</td>');
        buff.push('<td>'+ tmpUser.telefono +'</td>');
        buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" onclick = "borrarCliente('+ tmpUser.id +')" id="borrar"/></td>');
        buff.push('<td><input type="button" value="Editar" class="btn btn-info" onclick = "editarCliente('+ tmpUser.id +')" id="editar"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    listado.innerHTML =  buff.join('\n');
}

function cerrar_ventana(){
    newCliente.style.display = "none"
    form_cliente.reset()
}

btn_crear.addEventListener("click",()=>{
    const nombre = document.getElementById("nombre").value
    const ruc = document.getElementById("ruc").value
    const direccion = document.getElementById("direccion").value
    const telefono = document.getElementById("telefono").value

    if(validarUsuario(ruc)){
        crearCliente(nombre,ruc,direccion,telefono)
        cerrar_ventana()
        fnActualizarTabla()
    }
    else{
        alerta()
    }
})

function validarUsuario(ruc){
    let validarRuc = clientes.find(user => user.ruc == ruc)    
    if(validarRuc != undefined){
        return false
    }
    return true
}

function alerta(){    
    document.getElementById('alerta').style.display="block"
    setTimeout(() => {
        document.getElementById('alerta').style.display="none"
    },3000)
}

function crearCliente(nombre,ruc,direccion,telefono) {
    let newCliente = new cliente(clientes[clientes.length-1].id+1, nombre, ruc, direccion, telefono)  
    clientes.push(newCliente)  
    localStorage.setItem("clientes", JSON.stringify(clientes))
    console.log("registro exitoso!")
}

function borrarCliente(cliente_id){
    let cliente = clientes.find(user => user.id == cliente_id) 
    clientes = clientes.filter((user) => user !== cliente)
    localStorage.setItem("clientes", JSON.stringify(clientes))
    fnActualizarTabla()
}

function editarCliente(cliente_id){
    let cliente = clientes.find(user => user.id == cliente_id) 
    localStorage.setItem("editar", JSON.stringify(cliente))

    document.getElementById("nombre").value = cliente.nombre
    document.getElementById("ruc").value = cliente.ruc
    document.getElementById("direccion").value = cliente.direccion
    document.getElementById("telefono").value = cliente.telefono  

    newCliente.style.display = "block"
    btn_crear.style.display = "none"
    saveEditBtn.style.display = "block"      
}

saveEditBtn.addEventListener("click", ()=>{    
    let editar = JSON.parse(localStorage.getItem("editar"))
    console.log("inicio")


    for(let i = 0; i < clientes.length; i++){
        if(editar.id == clientes[i].id && validarUsuario(document.getElementById("ruc").value)){
            clientes[i].nombre = document.getElementById("nombre").value
            clientes[i].ruc = document.getElementById("ruc").value
            clientes[i].direccion = document.getElementById("direccion").value
            clientes[i].telefono = document.getElementById("telefono").value
        }
        console.log('error con ruc')
    }
    
    console.log("guardado!")
    localStorage.setItem("clientes", JSON.stringify(clientes))
    localStorage.removeItem("editar")
    cerrar_ventana()
    fnActualizarTabla()
})