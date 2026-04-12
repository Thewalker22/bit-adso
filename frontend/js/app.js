const API = 'http://localhost:3000/api/evidencias'

//----------LEER----------------------------------
const obtenerEvidencias = async () => {
    try{
        const respuesta = await fetch(API);
        const evidencias = await respuesta.json();
        mostrarEvidencias(evidencias);

    }catch(error){
        console.log('Error:', error);
    }

};

//--------Mostrar en tabla-----------------------
const mostrarEvidencias = (evidencias) => {
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';

    evidencias.forEach((ev, index) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${index +1}</td>
        <td>${ev.nombre}</td>
        <td>${ev.fecha_limite ?? 'Sin fecha'}</td>
        <td>${ev.estatus}</td>
        <td>
            <button onclick="entregarEvidencia(${ev.idencia})">Entregar
            </button>

            <button onclick="eliminarEvidencia(${ev.idencia})">Eliminar
            </button>`;
        tbody.appendChild(fila);       
    });
};

//--------Crear evidencia-----------------------
const crearEvidencia = async () => {
    const nombre = document.getElementById('input-nombre').value;
    const url = document.getElementById('input-url').value;
    const fecha_limite = document.getElementById('input-fecha').value;

    if (!nombre){
        alert('El nombre es obligatorio');
        return;
    }

    try{
        const respuesta = await fetch (API, {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                nombre,
                url,
                fecha_limite,
                idcomponente:1,
                idaprendiz:1
            })

        });

        const resultado = await respuesta.json();
        console.log(resultado);

        //Limpiar formulario y recargar tabla
        document.getElementById('input-nombre').value='';
        document.getElementById('input-url').valu='';
        document.getElementById('input-fecha').valu='';
        obtenerEvidencias();

    } catch (error){
        console.log('Error:', error);
    }
};

//--------Actualizar estatus-----------------------
const entregarEvidencia = async (id) => {
    try{
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            haeders: {'content-Type': 'application/json'},
            body:JSON.stringify({estatus:'enviada'})
    });
    obtenerEvidencias();

}catch(error){
    console.log('Error:', error);
}
};

//--------Eliminar-----------------------
const eliminarEvidencia = async (id) => {
    if(!confirm('¿seguro que quieres eliminar esta evidencia?')) return;

    try{
        await fetch(`${API}, ${id}`, {method: 'DELETE'});
        obtenerEvidencias();

    }catch (error){
        console.log('Error:' , error);
    }
};

//-------Eventos-----------------------
document.getElementById('btn-guardar').addEventListener('click', crearEvidencia);

//-------Iniciar-----------------------
obtenerEvidencias();
