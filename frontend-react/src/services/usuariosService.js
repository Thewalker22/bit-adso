const API = '/api/usuarios'
import api from "./axios"

//---------------------------Implementación axios

//Autentica al usuario y crea la sesión
export const login = async(usuario, contrasena) => {

    try{
        const {data} = await api.post('/usuarios/login', {
            usuario,
            contraseña:contrasena
        })
        return {ok: true, data}

    }catch (error){
        return {ok: false, data:error.reponse?.data}
    } 
}

//Cierra sesión
export const logout = async() => {
    await api.post('/usuarios/logout')
}

//Obtiene la sesión
export const obtenerSesion = async () => {
    try{
        const {data} = await api.get('/usuarios/sesion')
        return {ok: true, data}
    }catch (error){
        return {ok: false, data: error.response?.data}
    }
   
}

//Registro de un nuevo usuario
export const registrarUsuario = async (datos) => {

    try {
    const {data} = await api.post('usuarios/registro', datos)
    return {ok: true, data}

    }catch (error){
        return { ok:false, data: error.response?.data}
    }
}

//Obtiene los datos de los programas
export const cargarProg = async () => {
    try{
    const {data} = await api.get(`/programas`)
    return {ok: true, data}

    }catch(error){
        return {ok:false, data: error.response?.data}
    }
}

//-----------Implementación de fetch

/* //Autentica al usuario y crea la sesión
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

//Obtiene los datos de los programas
export const cargarProg = async () => {
    const res = await fetch(`/api/programas`, {
    })
    return  await res.json()
}
 */