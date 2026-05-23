const API = '/api/usuarios';

const iniciarSesion = async () =>{
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    if(!usuario || !contraseña) {
        alert('Todos los campos son requeridos');
        return;
    }

    try{
        const respuesta = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({usuario, contraseña}),
            credentials: 'include'
        });

        const resultado = await respuesta.json();

        if(!respuesta.ok){
            alert(resultado.error); //Respuesta si el usuario o contraseña son incorrectos
            return;
        }

        //Login exisotoso redirige a el dashboard
        alert(`Bienvenido ${resultado.nombre}`);
        window.location.href = '/dashboard.html'; // Redirección a la interfaz del dashboard

    }catch(error){
        console.log('Error:', error);
        alert('Error al conectar con el servidor');
    }
};

document.getElementById('btn-login').addEventListener('click', iniciarSesion);