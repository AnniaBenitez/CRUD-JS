//Botones de pagina principal
const ventana_new_factura = document.getElementById("ventana_new_factura")
const form_crear_factura = document.getElementById('form_crear_factura')
const botonCrearFactura = document.getElementById("btn_new_factura")
const btnVolverAtras = document.getElementById("atras")
const btnAnular = document.getElementById("anular")
const btnDetalle = document.getElementById("detalle")
const div_detalle_fac = document.getElementById("div_detalle_fac")

//Botones pagina crear factura
const guardarNewFactura = document.getElementById("guardar_factura")
const cancelar = document.getElementById("cerrar")
const cancelar2 = document.getElementById("cerrar2")
const btnAgregarItem = document.getElementById('btnAgregarItem')
const selectItem = document.getElementById('item')
const cantidadInput = document.getElementById('cantidad')
const subtotalInput = document.getElementById('subtotal')

//Botonces pagina detalle factura
const cancelar3 = document.getElementById("cerrar3")
const cancelar4 = document.getElementById("cerrar4")

//Datos del localStorage
let facturas = JSON.parse(localStorage.getItem("facturas")) || []
let clientes = JSON.parse(localStorage.getItem("clientes")) || []
let vendedores = JSON.parse(localStorage.getItem("vendedores")) || []
let Items = JSON.parse(localStorage.getItem("Items")) || []
let lista_de_compras = []

actualizarListaFacturas()
actualizarListaItems("items_factura")

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

cancelar3.addEventListener("click", ()=>{
    cerrar_ventana()
})

cancelar4.addEventListener("click", ()=>{
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

function cerrar_ventana(){
    ventana_new_factura.style.display = "none"
    div_detalle_fac.style.display = "none"
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
    if(validarItem(selectItem.value, cantidadInput.value)){
        let subtotal = parseInt(cantidadInput.value) * parseInt(getItem(selectItem.value).precio)
        lista_de_compras.push(new itemFactura(parseInt(cantidadInput.value) , getItem(selectItem.value), subtotal))
        actualizarListaItems("items_factura")
        cantidadInput.value = ''
        selectItem.value = undefined
        subtotal = ''
    }
    else{
        alerta()
    }    
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

function actualizarListaFacturas(){

    const listado = document.getElementById("tabla")

    if(facturas.length === 0){
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
        buff.push('<td>'+ (tmp.cliente).nombre + '</td>');
        buff.push('<td>'+ (tmp.vendedor).nombre +'</td>');
        buff.push('<td>'+ tmp.isCredito +'</td>');
        buff.push('<td><input type="button" value="detalle" class="btn btn-info" onclick = "verDetalleFactura('+ tmp.id +')" id="detalle"/></td>');
        buff.push('<td><input type="button" value="anular" class="btn btn-danger" onclick = "anularItemFactura('+ tmp.id +')" id="anular"/></td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    listado.innerHTML =  buff.join('\n');
}

function actualizarListaItems(zona){
    const listado = document.getElementById(zona)
    if(zona == 'items_factura_detalle'){
        document.getElementById('total_detalle').value = calcularTotal()
    }
    else{            
        document.getElementById('total').value = calcularTotal()
    } 

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
        if(zona == 'items_factura_detalle'){
            buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" disabled/></td>');
        }
        else{
            buff.push('<td><input type="button" value="Borrar" class="btn btn-danger" onclick = "borrarItemFactura('+ i +')" id="borrar"/></td>');
        }        
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
    if(lista_de_compras.length == 0){
        return false
    }
    if(cliente_actual == 'undefined'){
        return false
    }
    if(vendedor_actual == 'undefined'){
        return false
    }
    return true
}

function validarItem(item_actual, cantidad){   
    if(item_actual == 'undefined'){
        return false
    }
    if(cantidad <= 0){
        return false
    }
    return true
}

function crearFactura(fecha_actual, cliente_actual, vendedor_actual, isCredito, lista_de_compras) {
    let nuevaFactura
    if(facturas.length == 0){
        nuevaFactura = new factura(0, fecha_actual, cliente_actual, vendedor_actual, isCredito, lista_de_compras, calcularTotal()) 
    }
    else{
        let calcularID = facturas[facturas.length-1].id+1
        nuevaFactura = new factura(calcularID, fecha_actual, cliente_actual, vendedor_actual, isCredito, lista_de_compras, calcularTotal()) 
    }    
    facturas.push(nuevaFactura)  
    localStorage.setItem("facturas", JSON.stringify(facturas))
    console.log("registro exitoso!")
    lista_de_compras.splice(0,lista_de_compras.length);
}

function alerta(){    
    document.getElementById('alerta').style.display="block"
    setTimeout(() => {
        document.getElementById('alerta').style.display="none"
    },3000)
}

function borrarItemFactura(index){
    lista_de_compras.splice(index, 1);
    actualizarListaItems("items_factura")
}

function anularItemFactura(id){
    let factura = facturas.find(f => f.id == id) 
    facturas = facturas.filter((f) => f !== factura)
    localStorage.setItem("facturas", JSON.stringify(facturas))
    actualizarListaFacturas()
}

function verDetalleFactura(id){
    let factura = facturas.find(f => f.id == id)                                //se toma la factura a detallar
    document.getElementById("fecha_detalle").value = factura.fecha              //se carga la fecha
    document.getElementById("cliente_detalle").value = factura.cliente.nombre   //se carga el nombre    
    document.getElementById("vendedor_detalle").value = factura.vendedor.nombre //se carga vendedor     
    document.getElementById("metodo_detalle").value = factura.isCredito         //Se marca si es contado/ credito  
    document.getElementById('label_metodo_detalle').innerHTML = factura.isCredito   //'' 
    lista_de_compras = factura.items                                            //se carga lista de items
    actualizarListaItems('items_factura_detalle')                               //''    

    div_detalle_fac.style.display = "block"                                     //Se muestra ventana
}