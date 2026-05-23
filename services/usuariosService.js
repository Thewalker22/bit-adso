import api from "./axios";

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
        return {ok: false, data:error.response?.data}
    } 
}

//Cierra sesión
export const logout = async() => {
    await api.post('usuarios/logout')
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

    const { data } = await api.post(
        '/usuarios/registro',
        datos
     )
  
     return data
    
}

//Obtiene los datos de los programas
export const cargarProg = async () => {

    try {

        //console.log('CONSULTANDO API...');

        const response = await api.get('/programas');

        //console.log('RESPONSE COMPLETO:', response);

        //console.log('DATA:', response.data);
/* 
        console.log(
          JSON.stringify(response.data, null, 2)
        ); */

        return {
            ok: true,
            data: response.data
        };

    } catch(error){

        //console.log('ERROR COMPLETO:', error);

        console.log('ERROR RESPONSE:', error.response);

        return {
            ok:false,
            data:error.response?.data
        };

    }

}

