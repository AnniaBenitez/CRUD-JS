let vendedores = JSON.parse(localStorage.getItem("vendedores")) || []
let facturas = JSON.parse(localStorage.getItem("facturas")) || []
const selectItem = document.getElementById('vendedores')
const btnVolverAtras = document.getElementById("atras")

crearTablaComisiones()
getListadoVendedores()

selectItem.addEventListener('change', ()=>{
    crearTablaComisiones(selectItem.value)
})

function getListadoVendedores(){
    const buff = [];
    buff.push("<option value = "+ undefined +" selected>Vendedor</option>")
    for(let i = 0; i< vendedores.length; i++){
        const tmpUser = vendedores[i];
        buff.push('<option value = '+ tmpUser.id +'>' + tmpUser.id + ' - ' + tmpUser.nombre + '</option>')
    }
    document.getElementById('vendedores').innerHTML =  buff.join('\n');
}

btnVolverAtras.addEventListener("click", ()=>{
    window.location="home.html"
})

function getItem(id){
    let item = vendedores.find(Item => Item.id == id) 
    return item
}

function crearTablaComisiones(SelecVendedor){
    facturas = facturas.filter(f => f.isCredito == "Contado")
    const listado = document.getElementById("tabla")    
    if(facturas.length === 0){
        listado.innerHTML = '<table class="table table-stripe"><tr>No existen Facturas...</tr></table>';
        return;    
    }
    let filtrado
    if(SelecVendedor == undefined){
        filtrado = facturas
    }
    else{
        filtrado = facturas.filter(f => f.vendedor.id == SelecVendedor) 
    }
        const buff = [];
        buff.push('<table class="table table-stripe">');
        buff.push(' <thead>');
        buff.push('    <tr>');
        buff.push('      <th>ID</th>');
        buff.push('      <th>Fecha</th>');
        buff.push('      <th>Monto</th>');
        buff.push('      <th>Vendedor</th>');
        buff.push('      <th>Comisión</th>');
        buff.push('    </tr>');
        buff.push('  </thead>');
        buff.push('  <tbody>');
        console.log(filtrado)
        console.log(filtrado.length)
        for(let i = 0; i < filtrado.length; i++){
            const tmp = filtrado[i];
            console.log(tmp)
            buff.push('<tr>');
            buff.push('<td>'+ tmp.id +'</td>');
            buff.push('<td>'+ tmp.fecha+'</td>');
            buff.push('<td>'+ tmp.total+'</td>');
            buff.push('<td>'+ (tmp.vendedor).nombre +'</td>');
            buff.push('<td>'+ (tmp.total * (tmp.vendedor.porcentajeComision/100)) +'</td>');
            buff.push('</tr>');
        }
    
        buff.push('</tbody>');
        buff.push('</table>');
    
        listado.innerHTML =  buff.join('\n');
}
