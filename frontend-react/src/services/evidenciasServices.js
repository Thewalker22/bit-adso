const API = '/api/evidencias'

// Obtiene todas las evidencias
export const obtenerMisEvidencias = async () => {
    const res = await fetch(`${API}/mis-evidencias`,{
        credentials: 'include'
    })
    return await res.json()
}

// Obtiene el resumen estatus de la evidencia
export const obtenerResumen = async () => {
    const res = await fetch(`${API}/resumen`, {
        credentials: 'include'
    })
    return await res.json()
}

//Crea una nueva evidencia
export const crearEvidencia = async (datos) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(datos),
        credentials:'include'
    })
    return await res.json()
}

//Actuliza la  evidencia creada
export const actualizarEvidencia = async (id, datos) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers:{'Content-Type': 'app-aplication/json'},
        body:JSON.stringify(datos),
        credentials:'include'
    })
    return await res.json
}

//Elimina la  evidencia creada
export const eliminarEvidencia = async(id) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        credentials:'include'
    })
    return await res.json()
}



