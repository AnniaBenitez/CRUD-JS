const g_users = [];



function init(){
    // imprime por consola cuando haya terminado de cargarse
    console.log('%capp.js line:3 object', 'color: #007acc;', "Pagina completamente cargada");
    fnActualizarTabla();
}

function fnCrearUsuario(){
    console.log('%capp.js line:4', 'color: #007acc;', "a punto de crear un nuevo usuario!!!!");

    const divForm = document.getElementById("divForm");
    divForm.style.display = 'block';

    const divTabla = document.getElementById("divTabla");
    divTabla.style.display = 'none';
}


function fnGuardarUsuario(){
    alert("Guardando usuario");

    const txtNombre = document.getElementById("txtName");
    const txtEmail = document.getElementById("txtEmail");
    const txtEdad = document.getElementById("txtEdad");

    const newUser = new User(txtNombre.value, txtEmail.value, txtEdad.value);

    g_users.push(newUser);

    fnActualizarTabla();

console.log('%capp.js line:26 newUser', 'color: #007acc;', newUser);

    const divForm = document.getElementById("divForm");
    divForm.style.display = 'none';

    const divTabla = document.getElementById("divTabla");
    divTabla.style.display = 'block';
}


function fnCancelarUsuario(){
    alert("Accion cancelada!");

    fnActualizarTabla();

    const divForm = document.getElementById("divForm");
    divForm.style.display = 'none';

    const divTabla = document.getElementById("divTabla");
    divTabla.style.display = 'block';
}


function fnActualizarTabla(){

    const divTabla = document.getElementById("divTabla");

    if(g_users.length === 0){
        divTabla.innerHTML = 'No existen usuarios creados';
        return;    
    }

    const buff = [];
    buff.push('<table border="1" width="70%">');
    buff.push('  <thead>');
    buff.push('    <tr>');
    buff.push('      <th>Id</th>');
    buff.push('      <th>Nombre</th>');
    buff.push('      <th>Email</th>');
    buff.push('      <th>Edad</th>');
    buff.push('      <th>Acci&oacute;n</th>');
    buff.push('    </tr>');
    buff.push('  </thead>');
    buff.push('  <tbody>');

            
    for(let i = 0; i< g_users.length; i++){
        const tmpUser = g_users[i];

        buff.push('<tr>');
        buff.push('<td>'+ tmpUser.id +'</td>');
        buff.push('<td>'+ tmpUser.nombre +'</td>');
        buff.push('<td>'+ tmpUser.email +'</td>');
        buff.push('<td>'+ tmpUser.edad +'</td>');
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