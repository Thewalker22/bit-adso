import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import libroIcon from '../assets/libro.gif'
import camaraIcon from '../assets/camara-de-video.gif'
import ResumenCards from '../components/ResumenCards'
import TablaEvidencias from '../components/TablaEvidencias'
import FormEvidencia from "../components/FormEvidencias"
import { obtenerMisEvidencias, obtenerResumen, actualizarEvidencia } from "../services/evidenciasServices"
import {obtenerSesion, logout} from"../services/usuariosService"

function Dashboard() {
    const [usuario,    setUsuario]    = useState(null)
    const [resumen,    setResumen]    = useState(null)
    const [evidencias, setEvidencias] = useState([])
    const [evidenciaSeleccionada, setEvidenciaSeleccionada] = useState(null)
    const [cargando,   setCargando]   = useState(true)
  
    const navigate = useNavigate()
    
    useEffect(() => {
      const cargarTodo = async () => {
        try {
          const sesion = await obtenerSesion()
          if (!sesion.ok) { navigate('/login'); return }
          setUsuario(sesion.data) 
         
          const [resumen, evidencias] = await Promise.all([
            obtenerResumen(),
            obtenerMisEvidencias()
          ])
          console.log('RESUMEN:', resumen)
          console.log('EVIDENCIAS:', evidencias)

          setResumen(resumen)
          setEvidencias(evidencias)
        
  
        } catch (error) {
          
          console.log('Error exacto:', err.message)
          console.log('Error:', error)
        } finally {
          setCargando(false)
        }
      }
      cargarTodo()
    }, [])

    const entregarEvidencia = async (id) => {
        try {

         //Actualiza evidencia con estatus enviada y recarga datos
          await actualizarEvidencia(id, {estatus:'enviada'})
          recargarDatos()

        } catch (error) {
          console.log('Error:', error)
        }
    }

    //Función para recargar datos después de crear un evidencia
    const recargarDatos = async () => {
      try{
        const [resumen, evidencias] = await Promise.all([
         obtenerResumen(),
         obtenerMisEvidencias()
        ])

        setResumen(resumen)
        setEvidencias(evidencias)
      }catch (error) {
        console.log('Error:', error)
      }
    }

    //Función para reditar datos una evidencia

    const editarEvidencia = async (id, datos) => {
      try{
      
        await actualizarEvidencia(id, datos)
        setEvidenciaSeleccionada(null)
        recargarDatos()

      
      }catch (error) {
        console.log('Error:', error)
      }
    }

    const cerrarSesion = async () => {
      await logout() 
       
      navigate('/login')
    }
  
    if (cargando) return <p>Cargando...</p>
  
    return (
      <div>
        {/* Encabezado */}
        <div>
          <h2>Bienvenido, {usuario?.nombre}</h2>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
  
        {/* Resumen — componente separado */}
        {resumen && <ResumenCards resumen={resumen} />}

        {/* Formulario para crear evidencia */}
      <FormEvidencia 
      onCrear={recargarDatos} 
      onEditar={editarEvidencia}
      evidencia={evidenciaSeleccionada}
      />
     
         {/*Se pasa onEntregar como prop */}
      <TablaEvidencias
        evidencias={evidencias}
        onEntregar={entregarEvidencia}
        onEditar={editarEvidencia}
      />
      </div>
    )

    
  }
  
  export default Dashboard