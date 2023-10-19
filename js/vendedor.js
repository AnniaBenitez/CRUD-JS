const newVendedorVentana = document.getElementById("new_ventana")
const NewVendedorBtn = document.getElementById("new_vendedor")
let vendedores = JSON.parse(localStorage.getItem("vendedores")) || []
const btn_crear = document.getElementById("guardar_vendedor")
const btnCancelar = document.getElementById("cerrar")
const btnCancelar2 = document.getElementById("cerrar2")
const form_vendedor = document.getElementById("form_new_vendedor")
const listado = document.getElementById("tabla")
const btnVolverAtras = document.getElementById('atras')
const btnBorrarVendedor = document.getElementById('borrar')
const btnEditarVendedor = document.getElementById('editar')
const saveEditBtn = document.getElementById('guardar_editado')

btnVolverAtras.addEventListener("click", ()=>{
    window.location="home.html"
})

NewVendedorBtn.addEventListener("click", ()=>{
    newVendedorVentana.style.display = "block"
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

    if(vendedores.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen Vendedores...</tr></table>';
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
    buff.push('      <th>Porcentaje de Comisión</th>');
    buff.push('      <th>Borrar</th>');
    buff.push('      <th>Editar</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< vendedores.length; i++){
        const tmpUser = vendedores[i];

        buff.push('<tr>');
        buff.push('<td>'+ tmpUser.id +'</td>');
        buff.push('<td>'+ tmpUser.nombre +'</td>');
        buff.push('<td>'+ tmpUser.ruc + '</td>');
        buff.push('<td>'+ tmpUser.direccion +'</td>');
        buff.push('<td>'+ tmpUser.telefono +'</td>');
        buff.push('<td>'+ tmpUser.porcentajeComision +'</td>');
        buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" onclick = "borrarVendedor('+ tmpUser.id +')" id="borrar"/></td>');
        buff.push('<td><input type="button" value="Editar" class="btn btn-info" onclick = "editarVendedor('+ tmpUser.id +')" id="editar"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    listado.innerHTML =  buff.join('\n');
}

function cerrar_ventana(){
    newVendedorVentana.style.display = "none"
    form_vendedor.reset();
}

btn_crear.addEventListener("click",()=>{
    const nombre = document.getElementById("nombre").value
    const ruc = document.getElementById("ruc").value
    const direccion = document.getElementById("direccion").value
    const telefono = document.getElementById("telefono").value
    const comision = document.getElementById("porcentaje").value

    if(validarUsuario(ruc)){
        crearVendedor(nombre,ruc,direccion,telefono,comision)
        cerrar_ventana()
        fnActualizarTabla()
    }
    else{
        alerta()
    }
})

function validarUsuario(ruc){
    let validarRuc = vendedores.find(user => user.ruc == ruc)    
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

function crearVendedor(nombre,ruc,direccion,telefono,porcentaje) {
    let newVendedor
    if(vendedores.length == 0){
        newVendedor = new vendedor(0, nombre, ruc, direccion, telefono, porcentaje) 
    }
    else{
        let calcularID = vendedores[vendedores.length-1].id+1
        new vendedor(calcularID, nombre, ruc, direccion, telefono, porcentaje)
    }    
    vendedores.push(newVendedor)  
    localStorage.setItem("vendedores", JSON.stringify(vendedores))
    console.log("registro exitoso!")
}

function borrarVendedor(vendedor_id){
    let vendedor = vendedores.find(user => user.id == vendedor_id) 
    vendedores = vendedores.filter((user) => user !== vendedor)
    localStorage.setItem("vendedores", JSON.stringify(vendedores))
    fnActualizarTabla()
}

function editarVendedor(vendedor_id){
    let vendedor = vendedores.find(user => user.id == vendedor_id) 
    localStorage.setItem("editar", JSON.stringify(vendedor))

    document.getElementById("nombre").value = vendedor.nombre
    document.getElementById("ruc").value = vendedor.ruc
    document.getElementById("direccion").value = vendedor.direccion
    document.getElementById("telefono").value = vendedor.telefono  
    document.getElementById("porcentaje").value = vendedor.porcentajeComision  

    newVendedorVentana.style.display = "block"
    btn_crear.style.display = "none"
    saveEditBtn.style.display = "block"      
}

saveEditBtn.addEventListener("click", ()=>{    
    let editar = JSON.parse(localStorage.getItem("editar"))


    for(let i = 0; i < vendedores.length; i++){
        if(editar.id == vendedores[i].id){
            vendedores[i].nombre = document.getElementById("nombre").value
            vendedores[i].ruc = document.getElementById("ruc").value
            vendedores[i].direccion = document.getElementById("direccion").value
            vendedores[i].telefono = document.getElementById("telefono").value
            vendedores[i].porcentajeComision = document.getElementById("porcentaje").value
        }
    }
    
    console.log("guardado!")
    localStorage.setItem("vendedores", JSON.stringify(vendedores))
    localStorage.removeItem("editar")
    cerrar_ventana()
    fnActualizarTabla()
})
