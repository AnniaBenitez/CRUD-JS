//Botones de pagina principal
const ventana_new_factura = document.getElementById("ventana_new_factura")
const form_crear_factura = document.getElementById('form_crear_factura')
const botonCrearFactura = document.getElementById("btn_new_factura")
const btnVolverAtras = document.getElementById("atras")

//Botones pagina crear factura
const guardarNewFactura = document.getElementById("guardar_factura")
const cancelar = document.getElementById("cerrar")
const cancelar2 = document.getElementById("cerrar2")
const btnAgregarItem = document.getElementById('btnAgregarItem')
const selectItem = document.getElementById('item')
const cantidadInput = document.getElementById('cantidad')
const subtotalInput = document.getElementById('subtotal')
let lista_de_compras = []

//Datos del localStorage
let facturas = JSON.parse(localStorage.getItem("facturas")) || []
let clientes = JSON.parse(localStorage.getItem("clientes")) || []
let vendedores = JSON.parse(localStorage.getItem("vendedores")) || []
let Items = JSON.parse(localStorage.getItem("Items")) || []

botonCrearFactura.addEventListener("click", ()=>{
    document.getElementById("fecha").value = getFechaActual()
    getListadoClientes()
    getListadoVendedores()
    getListadoItems()
    ventana_new_factura.style.display = "block"    
})

cancelar.addEventListener("click", ()=>{
    cerrar_ventana()
})

cancelar2.addEventListener("click", ()=>{
    cerrar_ventana()
})

btnVolverAtras.addEventListener("click", ()=>{
    window.location="home.html"
})

guardarNewFactura.addEventListener("click", ()=>{
    guardar_factura()
    cerrar_ventana()
    actualizarListaFacturas()
})

btnAgregarItem.addEventListener('click', ()=>{
    aggItem()
})

cantidadInput.addEventListener('keyup', ()=>{
    let Item = getItem(selectItem.value)
    subtotalInput.value = parseInt(cantidadInput.value) * parseInt(Item.precio)
})

selectItem.addEventListener('change', ()=>{
    let Item = getItem(selectItem.value)
    subtotalInput.value = parseInt(cantidadInput.value) * parseInt(Item.precio)
})

window.onload = actualizarListaItems()
function actualizarListaItems(){

    const listado = document.getElementById("tabla")

    if(facturas.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen facturas...</tr></table>';
        return;    
    }

    const buff = [];
    buff.push('<table class="table table-stripe">');
    buff.push(' <thead>');
    buff.push('    <tr>');
    buff.push('      <th>Id</th>');
    buff.push('      <th>Fecha</th>');
    buff.push('      <th>Cliente</th>');
    buff.push('      <th>Vendedor</th>');
    buff.push('      <th>Credito</th>');
    buff.push('      <th>Total</th>');    
    buff.push('      <th>Borrar</th>');
    buff.push('      <th>Editar</th>');
    buff.push('      <th>Detalle</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< facturas.length; i++){
        const tmpUser = facturas[i];

        buff.push('<tr>');
        buff.push('<td>'+ tmpUser.id +'</td>');
        buff.push('<td>'+ tmpUser.fecha +'</td>');
        buff.push('<td>'+ tmpUser.cliente.getNombre +'</td>');
        buff.push('<td>'+ tmpUser.vendedor.getNombre +'</td>');
        buff.push('<td>'+ tmpUser.total +'</td>');
        buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" onclick = "borrarFactura('+ tmpUser.id +')" id="borrar"/></td>');
        buff.push('<td><input type="button" value="Editar" class="btn btn-info" onclick = "editarFactura('+ tmpUser.id +')" id="editar"/></td>');
        buff.push('<td><input type="button" value="Detalle" class="btn btn-info" onclick = "verDetalle('+ tmpUser.id +')" id="editar"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    divTabla.innerHTML =  buff.join('\n');
}

function cerrar_ventana(){
    ventana_new_factura.style.display = "none"
    form_crear_factura.reset()
}

function getFechaActual(){
    let fecha = new Date()
    let year = fecha.getFullYear()
    let month = fecha.getMonth() + 1
    let day = fecha.getDate();
    return (year + '-' + month + '-' + day)
}

function getListadoClientes(){
    const buff = [];
    buff.push("<option value = "+ undefined +" selected>Cliente</option>")
    for(let i = 0; i< clientes.length; i++){
        const tmpUser = clientes[i];
        buff.push('<option value = '+ tmpUser.id +'>' + tmpUser.id + ' - ' + tmpUser.nombre + '</option>')
    }
    document.getElementById('cliente').innerHTML =  buff.join('\n');
}

function getListadoVendedores(){
    const buff = [];
    buff.push("<option value = "+ undefined +" selected>Vendedor</option>")
    for(let i = 0; i< vendedores.length; i++){
        const tmpUser = vendedores[i];
        buff.push('<option value = '+ tmpUser.id +'>' + tmpUser.id + ' - ' + tmpUser.nombre + '</option>')
    }
    document.getElementById('vendedor').innerHTML =  buff.join('\n');
}

function getListadoItems(){
    const buff = [];
    buff.push("<option value = "+ undefined +" selected>Items</option>")
    for(let i = 0; i< Items.length; i++){
        const tmpItem = Items[i];
        buff.push('<option value = '+ tmpItem.id +'>' + tmpItem.descripcion + ' - ' + tmpItem.precio+ '</option>')
    }
    selectItem.innerHTML =  buff.join('\n');
}

function getItem(id){
    let item = Items.find(Item => Item.id == id) 
    return item
}

function getCliente(id){
    let item = clientes.find(Item => Item.id == id) 
    return item
}

function getVendedor(id){
    let item = vendedores.find(Item => Item.id == id) 
    return item
}

function getMetodoPago(){
    var radios = document.getElementsByName('tipo_pago')
    for (var radio of radios)
    {
        if (radio.checked) {
            return radio.value
        }
    }
}

function aggItem(){
    let subtotal = parseInt(cantidadInput.value) * parseInt(getItem(selectItem.value).precio)
    lista_de_compras.push(new itemFactura(parseInt(cantidadInput.value) , getItem(selectItem.value), subtotal))
    actualizarListaItems()
    cantidadInput.value = ''
    selectItem.value = undefined
    subtotal = ''
}

function guardar_factura(){

    let fecha_actual = document.getElementById("fecha").value
    let cliente_actual = getCliente(document.getElementById('cliente').value)
    let vendedor_actual = getVendedor(document.getElementById('vendedor').value)
    let isCredito = getMetodoPago()
    
    if(validarFactura(cliente_actual, vendedor_actual)){
        crearFactura(fecha_actual, cliente_actual, vendedor_actual, isCredito, lista_de_compras)
        cerrar_ventana()
        actualizarListaFacturas()
    }
    else{
        alerta()
    }

    
}

actualizarListaItems()
function actualizarListaItems(){

    const listado = document.getElementById("items_factura")

    if(lista_de_compras.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen Items...</tr></table>';
        return;    
    }

    const buff = [];
    buff.push('<table class="table table-stripe">');
    buff.push(' <thead>');
    buff.push('    <tr>');
    buff.push('      <th>#</th>');
    buff.push('      <th>Descripcion</th>');
    buff.push('      <th>Cantidad</th>');
    buff.push('      <th>Precio</th>');
    buff.push('      <th>Subtotal</th>');
    buff.push('      <th>Borrar</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< lista_de_compras.length; i++){
        const tmp = lista_de_compras[i];

        buff.push('<tr>');
        buff.push('<td>'+ i +'</td>');
        buff.push('<td>'+ tmp.item.descripcion +'</td>');
        buff.push('<td>'+ tmp.cantidad + '</td>');
        buff.push('<td>'+ tmp.item.precio +'</td>');
        buff.push('<td>'+ tmp.subtotal +'</td>');
        buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" onclick = "borrarItemFactura('+ i +')" id="borrar"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    listado.innerHTML =  buff.join('\n');
    document.getElementById('total').value = calcularTotal()
}

actualizarListaFacturas()
function actualizarListaFacturas(){

    const listado = document.getElementById("tabla")

    if(lista_de_compras.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen Facturas...</tr></table>';
        return;    
    }

    const buff = [];
    buff.push('<table class="table table-stripe">');
    buff.push(' <thead>');
    buff.push('    <tr>');
    buff.push('      <th>ID</th>');
    buff.push('      <th>Fecha</th>');
    buff.push('      <th>Cliente</th>');
    buff.push('      <th>Vendedor</th>');
    buff.push('      <th>Pago</th>');
    buff.push('      <th>Detalle</th>');
    buff.push('      <th>Anular</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< facturas.length; i++){
        const tmp = facturas[i];

        buff.push('<tr>');
        buff.push('<td>'+ tmp.id +'</td>');
        buff.push('<td>'+ tmp.fecha+'</td>');
        buff.push('<td>'+ tmp.cliente.nombre + '</td>');
        buff.push('<td>'+ tmp.vendedor.nombre +'</td>');
        buff.push('<td>'+ tmp.isCredito +'</td>');
        buff.push('<td><input type="button" value="detalle" class="btn btn-info" onclick = "verDetalleFactura('+ tmp.id +')" id="detalle"/></td>');
        buff.push('<td><input type="button" value="anular" class="btn btn-danger" onclick = "anularItemFactura('+ tmp.id +')" id="anular"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    listado.innerHTML =  buff.join('\n');
}

function calcularTotal(){
    let tot = 0
    for(let i=0; i<lista_de_compras.length; i++){
        tot += lista_de_compras[i].subtotal 
    }
    return tot
}

function validarFactura(cliente_actual, vendedor_actual){   
    if(cliente_actual != undefined){
        return true
    }
    if(vendedor_actual != undefined){
        return true
    }
    return false
}

function crearFactura(fecha_actual, cliente_actual, vendedor_actual, isCredito, lista_de_compras) {
    let nuevaFactura = new factura(facturas.length, fecha_actual, cliente_actual, vendedor_actual, isCredito, lista_de_compras) 
    facturas.push(nuevaFactura)  
    localStorage.setItem("facturas", JSON.stringify(facturas))
    console.log("registro exitoso!")
}

function alerta(){    
    document.getElementById('alerta').style.display="block"
    setTimeout(() => {
        document.getElementById('alerta').style.display="none"
    },3000)
}

///////////////////////
/*



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
*/