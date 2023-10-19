let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
const registrar = document.getElementById("boton_registrar")
registrar.addEventListener("click", registrarUsuario)

function registrarUsuario(){    
    const nombre = document.getElementById("nombre").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm_password").value

    if(validarUsuario(username,email,password, confirmPassword)){
        crearUsuario(nombre,username,email,password)
        window.location.href = "index.html"
    }
    else{
        alerta()
    }
}

function validarUsuario(username,email,password, confirmPassword){
    let validarUsername = usuarios.find(user => user.username == username)
    let validarEmail = usuarios.find(user => user.email == email)
    
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

function crearUsuario(nombre,username,email,password) {
    let newUser = new User(usuarios[usuarios.length-1].id+1, nombre, username, email, password)  
    usuarios.push(newUser)  
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    console.log("registro exitoso!")
}

function alerta(){    
    document.getElementById('alerta').style.display="block"
    setTimeout(() => {
        document.getElementById('alerta').style.display="none"
    },3000)
}
