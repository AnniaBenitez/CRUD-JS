const usuario = JSON.parse(localStorage.getItem('usuario_activo')) || false
const nombre = document.getElementById('usuario')

nombre.innerHTML =usuario.nombre

if(!usuario){
    window.location.href = 'login.html'
}

document.getElementById('cerrar_sesion').addEventListener('click',()=>{
    localStorage.removeItem('usuario')
})
