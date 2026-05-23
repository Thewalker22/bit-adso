import axios from 'axios';

const api = axios.create ({

    // url base backend
    baseURL: 'http://192.168.20.30:3000/api',

    //Importante para las sesiones
    //withCredentials:true,

    // Crea los headers
    headers:{
        'Content-Type': 'application/json',
    },
    
    // Tiempo máximo de espera
    timeout: 10000,
});
export default api;