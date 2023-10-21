let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
const btnModificarUsuario = document.getElementById('guardar_usuario')
const btnCancelar = document.getElementById("cerrar")
const btnEliminarUsuario = document.getElementById("eliminar_usuario")
const usuario = JSON.parse(localStorage.getItem('usuario_activo')) || false
const new_ventana = document.getElementById('new_ventana')

document.getElementById('nombre').value = usuario.nombre
document.getElementById('username').value = usuario.username
document.getElementById('email').value = usuario.email
document.getElementById('password').value = usuario.password
document.getElementById('confirm_password').value = usuario.password

new_ventana.style.display = "block"

btnCancelar.addEventListener("click", ()=>{
    window.location="home.html"
})

btnModificarUsuario.addEventListener("click",()=>{
    const nombre = document.getElementById("nombre").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm_password").value

    if(validarUsuario(username,email,password,confirmPassword)){
        for(let i = 0; i < usuarios.length; i++){
            if(usuario.id == usuarios[i].id){
                usuarios[i].nombre = nombre
                usuarios[i].username = username
                usuarios[i].email = email
                usuarios[i].password = password                
            }
        }    
        alert("guardado! Por favor vuelva a iniciar sesión para ver los cambios!")
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    }
    else{
        alerta()
    } 
})

btnEliminarUsuario.addEventListener("click", ()=>{
    let confirmacion = confirm("Borrar mi usuario?");
    if(confirmacion == true){
        usuarios = usuarios.filter(user => user.id != usuario.id);
        console.log(usuarios)   
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        localStorage.removeItem('usuario')
        window.location.href = "index.html"
    }
})

function validarUsuario(username,email,password, confirmPassword){
    let verificar = usuarios.filter(user => user.id != usuario.id);
    let validarUsername = verificar.find(user => user.username == username)
    let validarEmail = verificar.find(user => user.email == email)
    
    if(validarUsername != undefined){
        return false
    }
    if(validarEmail != undefined){
        return false
    }
    if(password != confirmPassword){
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