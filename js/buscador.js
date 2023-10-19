//Datos del localStorage
let facturas = JSON.parse(localStorage.getItem("facturas")) || []
let facturas_filtradas = []

//botones del form
const btnBuscar = document.getElementById('boton_buscar')
const btnAtras = document.getElementById('boton_cancelar')

btnBuscar.addEventListener("click", ()=>{
    actualizarListaFacturas(filtrarFacturas())
})

btnAtras.addEventListener("click", ()=>{
    window.location="home.html"
})

function actualizarListaFacturas(facturas_filtradas){
    const divFacturasLista = document.getElementById('lista_de_facturas')

    if(facturas_filtradas.length === 0){
        divFacturasLista.innerHTML = '<table class="table table-stripe"><tr>No existen Facturas en esas fechas...</tr></table>';
        return;    
    }

    const buff = []

    for(let i = 0; i< facturas_filtradas.length; i++){
        const tmp = facturas_filtradas[i];
        buff.push(' <div class="cuadro cuadro3">')
        buff.push('     <form class="d-flex flex-column justify-content-around"> ')
        buff.push('         <div class="borde d-flex row">')
        buff.push('             <div class="form-outline mb-4 col-3">')
        buff.push('                 <label class="form-label" for="fecha_detalle">Fecha:</label>')
        buff.push('                 <input type="date" value='+tmp.fecha+' class="form-control" disabled />')
        buff.push('             </div>')
        buff.push( '            <div class="form-outline mb-4 col-3">')
        buff.push('                 <label class="form-label" for="cliente_detalle">Cliente:</label>')
        buff.push('                 <input type="text" value='+tmp.cliente.nombre+' class="form-control" disabled />')
        buff.push('             </div>')
        buff.push('             <div class="form-outline mb-4 col-3">')
        buff.push('                 <label class="form-label" for="vendedor_detalle">Vendedor:</label>')
        buff.push('                 <input type="text" value='+tmp.vendedor.nombre+' class="form-control" disabled />')
        buff.push('             </div>')
        buff.push('             <div class="checks col-3">')
        buff.push('                 <div class="form-check">')
        buff.push('                     <input class="form-check-input" type="radio" name="metodo_detalle" value='+tmp.isCredito+' checked>')
        buff.push('                     <label class="form-check-label" for="metodo_detalle" value='+tmp.isCredito+'>'+tmp.isCredito+' </label>')
        buff.push('                 </div>')
        buff.push('             </div>')
        buff.push('         </div>')
        buff.push('         <div class="borde items d-flex row" id="items_factura_detalle">') //aca van las facturas
        buff.push('             <table class="table table-stripe">');
        buff.push('                 <thead>');
        buff.push('                     <tr>');
        buff.push('                         <th>#</th>');
        buff.push('                         <th>Descripcion</th>');
        buff.push('                         <th>Cantidad</th>');
        buff.push('                         <th>Precio</th>');
        buff.push('                         <th>Subtotal</th>');
        buff.push('                     </tr>');
        buff.push('                 </thead>');
        buff.push('                 <tbody>');
                                        for(let j=0; j< tmp.items.length; j++){
                                            tmpItem = tmp.items[j]

                                            buff.push('<tr>');
                                            buff.push('<td>'+ j +'</td>');
                                            buff.push('<td>'+ tmpItem.item.descripcion +'</td>');
                                            buff.push('<td>'+ tmpItem.cantidad + '</td>');
                                            buff.push('<td>'+ tmpItem.item.precio +'</td>');
                                            buff.push('<td>'+ tmpItem.subtotal +'</td>');       
                                            buff.push('</tr>');
                                        }
                                    buff.push('</tbody>');
                                buff.push('</table>');
        buff.push('         </div>')
        buff.push('         <div class="form-outline mb-4 total_compra">')
        buff.push('             <label class="form-label total_label" for="total_detalle">Total:</label>')
        buff.push('             <input type="number" value='+tmp.total+' class="total_input" disabled />')
        buff.push('         </div>')
        buff.push('     </form>')
        buff.push(' </div>')
    }

    buff.push('</tbody>');
    buff.push('</table>');
    
    divFacturasLista.innerHTML = buff.join('\n')
}

function filtrarFacturas(){

    const fecha_inicio = document.getElementById('fecha_inicio').value
    const fecha_fin = document.getElementById('fecha_fin').value
    facturas_filtradas = facturas.filter((f) => filtro(fecha_inicio,fecha_fin,f.fecha))

    return facturas_filtradas
}

function filtro(inicio,fin,fecha_fac){
    
    let f_inicio = new Date(inicio);
    let f_fin = new Date(fin);
    let f = new Date(fecha_fac);
    
    if(inicio == ""){
        f_inicio = ""
    }
    if(fin == ""){
        f_fin = ""
    }   

    if(f_inicio != ""){
        if(f_fin!=""){
            return f <= f_fin && f >= f_inicio
        }
        else{
            return f >= f_inicio
        }
    }
    else{
        if(f_fin==""){
            return true
        }
        else{
            return f <= f_fin
        }
                
    }
}