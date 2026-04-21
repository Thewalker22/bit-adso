
const API = '/api/evidencias';

// Cargar el nombre del usuario en sesión

const cargarSesion = async () =>{
    try{
        const respuesta = await fetch('/api/usuarios/sesion',{
        credentials: 'include' 
        });
       
        const datos = await respuesta.json();

        if(!respuesta.ok){
            //Si no hay sesisón redirie al login
            window.location.href = '/login.html';
            return;
        }
        document.getElementById('nombre-usuario').textContent = datos.nombre;

    }catch(error){
        console.log('Error:, error');
    }
};

//Cargar resumen conteos estatus
const cargarResumen = async () =>{
    try{
        const respuesta = await fetch(`${API}/resumen`,{
        credentials: 'include'
        });
        const resumen = await respuesta.json();

        document.getElementById('tabla-resumen').innerHTML = `
        <tr>
            <td>${resumen.total}</td>
            <td>${resumen.enviadas}</td>
            <td>${resumen.pendientes}</td>
            <td>${resumen.vencidas}</td>
        </tr>
        `;
    
    }catch(error){
        console.log('Error:', error);
    }

};

//Cargar evidencias según el usuario
//----------LEER----------------------------------
const obtenerEvidencias = async () => {
    try {
        const respuesta = await fetch(`${API}/mis-evidencias`,{
        credentials: 'include'
        });
        const evidencias = await respuesta.json();
        mostrarEvidencias(evidencias);
    } catch (error) {
        console.log('Error:', error);
    }
 
};
 
//--------Mostrar en tabla-----------------------
const mostrarEvidencias = (evidencias) => {
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';
 
    evidencias.forEach((ev, index) => {
        const fila = document.createElement('tr');
        fila.id = `fila-${ev.idevidencia}`;
       //  fila.dataset.idclase = ev.idclase ?? ''; 
 
        const fechaFormateada = ev.fecha_limite
            ? new Date(ev.fecha_limite).toLocaleString().slice(0, 16) : '';
 
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td id="td-nombre-${ev.idevidencia}">${ev.nombre}</td>
            <td id="td-url-${ev.idevidencia}">
                <a href="${ev.url ?? '#'}" target="_blank">Entregar</a>
            </td>
            <td id="td-fecha-${ev.idevidencia}">${fechaFormateada || 'Sin fecha'}</td>
            <td id="td-estatus-${ev.idevidencia}">${ev.estatus}</td>
            <td id="td-material-${ev.idevidencia}">
                <a href="${ev.url_material ?? '#'}" target="_blank">M</a>
            </td>
            <td id="td-url-clase-${ev.idevidencia}">
                <a href="${ev.url_clase ?? '#'}" target="_blank">🎓</a>
            </td>
            <td id="td-acciones-${ev.idevidencia}">
                <button onclick="activarEdicion(${ev.idevidencia})">Editar</button>
                <button onclick="entregarEvidencia(${ev.idevidencia})">Entregar</button>
                <button onclick="eliminarEvidencia(${ev.idevidencia})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    
        
    });
    
};
 
//--------Activar edición inline-----------------------
const activarEdicion = async (id) => {
    try {
        const respuesta = await fetch(`${API}/${id}`,{
        credentials: 'include'
        });
        const ev = await respuesta.json();
 
        const fechaFormateada = ev.fecha_limite
            ? new Date(ev.fecha_limite).toISOString().slice(0, 16) : '';
 
        document.getElementById(`td-nombre-${id}`).innerHTML =
            `<input type="text" id="inp-nombre-${id}" value="${ev.nombre ?? ''}">`;
 
        document.getElementById(`td-url-${id}`).innerHTML =
            `<input type="url" id="inp-url-${id}" value="${ev.url ?? ''}">`;
 
        document.getElementById(`td-fecha-${id}`).innerHTML =
            `<input type="datetime-local" id="inp-fecha-${id}" value="${fechaFormateada}">`;
 
        document.getElementById(`td-estatus-${id}`).innerHTML = `
            <select id="inp-estatus-${id}">
                <option value="pendiente" ${ev.estatus === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                <option value="enviada"   ${ev.estatus === 'enviada'   ? 'selected' : ''}>Enviada</option>
                <option value="vencida"   ${ev.estatus === 'vencida'   ? 'selected' : ''}>Vencida</option>
            </select>`;
 
        document.getElementById(`td-material-${id}`).innerHTML =
            `<input type="url" id="inp-url-material-${id}" value="${ev.url_material ?? ''}">`;
 
        document.getElementById(`td-url-clase-${id}`).innerHTML =
            `<input type="url" id="inp-url-clase-${id}" value="${ev.url_clase ?? ''}">`;
 
        document.getElementById(`td-acciones-${id}`).innerHTML = `
            <button onclick="guardarEdicionInline(${id})">💾 Guardar</button>
            <button onclick="obtenerEvidencias()">❌ Cancelar</button>
        `;
 
    } catch (error) {
        console.log('Error:', error);
    }
};
 
//--------Guardar edición inline-----------------------
const guardarEdicionInline = async (id) => {
    try {
        const nombre = document.getElementById(`inp-nombre-${id}`).value;
 
        if (!nombre) {
            alert('El nombre es obligatorio');
            return;
        }
 
        // actualiza los datos de la  evidencia 
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: document.getElementById(`inp-nombre-${id}`).value,
                url:          document.getElementById(`inp-url-${id}`).value,
                fecha_limite: document.getElementById(`inp-fecha-${id}`).value,
                estatus:      document.getElementById(`inp-estatus-${id}`).value,
                url_material: document.getElementById(`inp-url-material-${id}`).value,
                url_clase: document.getElementById(`inp-url-clase-${id}`).value
            }),
            credentials: 'include'
        });
 
        obtenerEvidencias();
 
    } catch (error) {
        console.log('Error:', error);
    }
};
 
//--------Crear evidencia-----------------------
const crearEvidencia = async () => {
    const nombre       = document.getElementById('input-nombre').value;
    const url          = document.getElementById('input-url').value;
    const fecha_limite = document.getElementById('input-fecha').value;
    const url_clase    = document.getElementById('input-url-clase').value;
    const url_material = document.getElementById('input-url-material').value;
 
    if (!nombre) {
        alert('El nombre es obligatorio');
        return;
    }
 
    try {
        await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, url, fecha_limite, url_material, url_clase }),
            credentials: 'include'
        });
 
        document.getElementById('input-nombre').value = '';
        document.getElementById('input-url').value = '';
        document.getElementById('input-fecha').value = '';
        document.getElementById('input-url-material').value = '';
        document.getElementById('input-url-clase').value = '';
      
 
        obtenerEvidencias();
 
    } catch (error) {
        console.log('Error:', error);
    }
};
 
//--------Entregar evidencia-----------------------
const entregarEvidencia = async (id) => {
    try {
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estatus: 'enviada' }),
            credentials: 'include'
        });
        obtenerEvidencias();
    } catch (error) {
        console.log('Error:', error);
    }
};
 
//--------Eliminar-----------------------
const eliminarEvidencia = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta evidencia?')) return;
    try {
        await fetch(`${API}/${id}`, { method: 'DELETE' ,
        credentials: 'include'
    });
        obtenerEvidencias();
    } catch (error) {
        console.error('Error:', error);
    }
};
 
document.getElementById('btn-logout').addEventListener('click', async ()=>{
    await fetch('/api/usuarios/logout', {method:'POST'});
    window.location.href = '/login.html';
});

//-------Eventos-----------------------
document.getElementById('btn-guardar').addEventListener('click', crearEvidencia);
 
//-------Iniciar-----------------------
cargarSesion();
cargarResumen();
obtenerEvidencias();


 