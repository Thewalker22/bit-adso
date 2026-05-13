const API = '/api/usuarios'

//Autentica al usuario y crea la sesión
export const login = async(usuario, contrasena) => {
    const res = await fetch(`${API}/login`, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({usuario, contraseña: contrasena}),
        credentials:'include'
    })
    return { ok: res.ok, data: await res.json()}
}
//Cierra sesión
export const logout = async() => {
    const res = await fetch(`${API}/logout`, {
        method:'POST',
        credentials:'include'
    })
}

//Obtiene la sesión
export const obtenerSesion = async () => {
    const res = await fetch(`${API}/sesion`, {
        credentials:'include'
    })
    return {ok: res.ok, data: await res.json()}
}

//Registro de un nuevo usuario
export const registrarUsuario = async (datos) => {
    const res = await fetch(`${API}/registro`, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(datos),
        credentials:'include'
    })
    return {ok: res.ok, data: await res.json()}
}