const usuario = JSON.parse(localStorage.getItem('usuario_activo')) || false
const nombre = document.getElementById('usuario')

nombre.innerHTML = usuario.nombre

if(!usuario){
    window.location.href = 'login.html'
}

document.getElementById('cerrar_sesion').addEventListener('click',()=>{
    localStorage.removeItem('usuario')
})

const btnFactura = document.getElementById('btnFactura')
const btnCliente = document.getElementById('btnCliente')
const btnVendedor = document.getElementById('btnVendedor')
const btnBuscador = document.getElementById('btnBuscador')
const confUsuario = document.getElementById('confUsuario')
const btnInventario = document.getElementById('btnInventario')

btnFactura.addEventListener('click', ()=>{
    window.location.href = 'factura.html'
})

btnCliente.addEventListener('click', ()=>{
    window.location.href = 'cliente.html'
})

btnInventario.addEventListener('click', ()=>{
    window.location.href = 'inventario.html'
})

btnVendedor.addEventListener('click', ()=>{
    window.location.href = 'vendedor.html'
})

btnBuscador.addEventListener('click', ()=>{
    window.location.href = 'buscador.html'
})
