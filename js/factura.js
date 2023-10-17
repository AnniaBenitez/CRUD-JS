const newFactura = document.getElementById("new")
const botonAdd = document.getElementById("new_factura")
let facturas = JSON.parse(localStorage.getItem("facturas")) || []
const crear = document.getElementById("guardar_factura")
const cancelar = document.getElementById("cerrar")
const cancelar2 = document.getElementById("cerrar2")
const form_new_factura = document.getElementById("form_new_factura")

botonAdd.addEventListener("click", ()=>{
    newFactura.style.display = "block"
})

cancelar.addEventListener("click", ()=>{
    newFactura.style.display = "none"
    form_new_factura.reset();
})

cancelar2.addEventListener("click", ()=>{
    newFactura.style.display = "none"
    form_new_factura.reset();
})

window.onload = fnActualizarTabla()
function fnActualizarTabla(){

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
        buff.push('<td>');
        buff.push('<input type="button" value="Borrar" />');
        buff.push('<input type="button" value="Editar" />');
        buff.push('</td>');
        buff.push('</tr>');
    }

    buff.push('</tbody>');
    buff.push('</table>');

    divTabla.innerHTML =  buff.join('\n');
}