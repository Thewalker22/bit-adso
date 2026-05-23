const API = '/api/usuarios'
const API_PROGRAMAS = '/api/programas'

//Carga listado de programas al abrir la página

const cargarProgramas = async () =>{
    const respuesta = await fetch(API_PROGRAMAS);
    const programas = await respuesta.json();

    const select = document.getElementById('idprograma');
    programas.forEach(p => {
        const option = document.createElement('option');
        option.value = p.idprograma;
        option.textContent = p.nombre;
        select.appendChild(option);        
    });
};

const registroUsuario = async () =>{
    // Leer lo valores del formulario
    const nombre = document.getElementById('nombre').value;
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contrasena').value;
    const idprograma = document.getElementById('idprograma').value;

    // Log para evaluar los datos que el usuario ingresa
    /* console.log('nombre:', nombre);
    console.log('usuario:', usuario);
    console.log('contraseña:', contraseña);
    console.log('idprograma:', idprograma); */

    //Se valida que los datos se ingresen
    if(!nombre || !usuario || !contraseña || !idprograma){
        alert('Todos los campos son requeridos');
        return;
    } 
    const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloTexto.test(nombre)) {
        alert('El nombre solo debe contener letras');
        return;
    }
    try{
    //Se envían los datos a la API
        const respuesta = await fetch (`${API}/registro`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nombre, usuario, contraseña, idprograma})
        });   
        const resultado = await respuesta.json();
        
        if(!respuesta.ok){
            alert(resultado.error);
            return;
        }
        window.location.href = '/login.html'; //Redirige a la interfaz del login.
    }catch(error){
        console('Error:', error);
        return;
    }
};

//Conexión boton registro interfaz registro
document.getElementById('btn-registro').addEventListener('click', registroUsuario);

// Iniciar carga de programas
cargarProgramas();
