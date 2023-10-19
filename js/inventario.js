const newItemVentana = document.getElementById("new_ventana")
const NewItemBtn = document.getElementById("new_item")
let Items = JSON.parse(localStorage.getItem("Items")) || []
const btn_crear = document.getElementById("guardar_item")
const btnCancelar = document.getElementById("cerrar")
const btnCancelar2 = document.getElementById("cerrar2")
const form_item = document.getElementById("form_new_item")
const listado = document.getElementById("tabla")
const btnVolverAtras = document.getElementById('atras')
const btnBorrarItem = document.getElementById('borrar')
const btnEditarItem = document.getElementById('editar')
const saveEditBtn = document.getElementById('guardar_editado')

btnVolverAtras.addEventListener("click", ()=>{
    window.location="home.html"
})

NewItemBtn.addEventListener("click", ()=>{
    newItemVentana.style.display = "block"
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

    if(Items.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen Items...</tr></table>';
        return;    
    }

    const buff = [];
    buff.push('<table class="table table-stripe">');
    buff.push(' <thead>');
    buff.push('    <tr>');
    buff.push('      <th>Id</th>');
    buff.push('      <th>Descripcion</th>');
    buff.push('      <th>Precio</th>');
    buff.push('      <th>Borrar</th>');
    buff.push('      <th>Editar</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< Items.length; i++){
        const tmpItem = Items[i];

        buff.push('<tr>');
        buff.push('<td>'+ tmpItem.id +'</td>');
        buff.push('<td>'+ tmpItem.descripcion +'</td>');
        buff.push('<td>'+ tmpItem.precio +'</td>');
        buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" onclick = "borrarItem('+ tmpItem.id +')" id="borrar"/></td>');
        buff.push('<td><input type="button" value="Editar" class="btn btn-info" onclick = "editarItem('+ tmpItem.id +')" id="editar"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    listado.innerHTML =  buff.join('\n');
}

function cerrar_ventana(){
    newItemVentana.style.display = "none"
    form_item.reset();
}

btn_crear.addEventListener("click",()=>{
    const descripcion = document.getElementById("descripcion").value
    const precio = document.getElementById("precio").value

    if(validarItem(descripcion, precio)){
        crearItem(descripcion,precio)
        cerrar_ventana()
        fnActualizarTabla()
    }
    else{
        alerta()
    }
})

function validarItem(descripcion, precio){
    let validarDescripcion = Items.find(user => user.descripcion == descripcion)    
    if(validarDescripcion != undefined){
        return false
    }
    if(precio<0){
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

function crearItem(descripcion,precio) {
    let newItem = new items(facturas[facturas.length-1].id+1, descripcion, precio)  
    Items.push(newItem)  
    localStorage.setItem("Items", JSON.stringify(Items))
    console.log("registro exitoso!")
}

function borrarItem(itemId){
    let item = Items.find(i => i.id == itemId) 
    Items = Items.filter((i) => i !== item)
    localStorage.setItem("Items", JSON.stringify(Items))
    fnActualizarTabla()
}

function editarItem(itemId){
    let item = Items.find(i => i.id == itemId) 
    localStorage.setItem("editar", JSON.stringify(item))

    document.getElementById("descripcion").value = item.descripcion
    document.getElementById("precio").value = item.precio

    newItemVentana.style.display = "block"
    btn_crear.style.display = "none"
    saveEditBtn.style.display = "block"      
}

saveEditBtn.addEventListener("click", ()=>{    
    let editar = JSON.parse(localStorage.getItem("editar"))

    for(let i = 0; i < Items.length; i++){
        if(editar.id == Items[i].id){
            Items[i].descripcion = document.getElementById("descripcion").value
            Items[i].precio = document.getElementById("precio").value
        }
    }
    
    console.log("guardado!")
    localStorage.setItem("Items", JSON.stringify(Items))
    localStorage.removeItem("editar")
    cerrar_ventana()
    fnActualizarTabla()
})
