const boton_ingresar = document.getElementById("boton_ingresar")
boton_ingresar.addEventListener('click', login)
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

function login(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    const existeUsuario = usuarios.find(user => user.email === email && user.password === password)

    if(existeUsuario != undefined){
        window.location="home.html"
        localStorage.setItem('usuario_activo', JSON.stringify(existeUsuario))
    }
    else{
        alerta()
    }
}

function alerta(){    
    document.getElementById('alerta').style.display="block"
    setTimeout(() => {
        document.getElementById('alerta').style.display="none"
    },3000)
}