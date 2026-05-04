import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import libroIcon from '../assets/libro.gif'
import camaraIcon from '../assets/camara-de-video.gif'
import ResumenCards from '../components/ResumenCards'
import TablaEvidencias from '../components/TablaEvidencias'
import FormEvidencia from "../components/FormEvidencias"

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
          const resSesion = await fetch('/api/usuarios/sesion', {
            credentials: 'include'
          })
          if (!resSesion.ok) { navigate('/login'); return }
          setUsuario(await resSesion.json())
  
          const [resResumen, resEvidencias] = await Promise.all([
            fetch('/api/evidencias/resumen',        { credentials: 'include' }),
            fetch('/api/evidencias/mis-evidencias', { credentials: 'include' })
          ])
          setResumen(await resResumen.json())
          setEvidencias(await resEvidencias.json())
  
        } catch (error) {
          console.log('Error:', error)
        } finally {
          setCargando(false)
        }
      }
      cargarTodo()
    }, [])

    const entregarEvidencia = async (id) => {
        try {
          await fetch(`/api/evidencias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estatus: 'enviada' }),
            credentials: 'include'
          })
      
          // Recargar resumen y evidencias después de entregar
          const [resResumen, resEvidencias] = await Promise.all([
            fetch('/api/evidencias/resumen',        { credentials: 'include' }),
            fetch('/api/evidencias/mis-evidencias', { credentials: 'include' })
          ])
          setResumen(await resResumen.json())
          setEvidencias(await resEvidencias.json())
      
        } catch (error) {
          console.log('Error:', error)
        }
      }

    //Función para recargar datos después de crear un evidencia

    const recargarDatos = async () => {
      try{
        const [resResumen, resEvidencias] = await Promise.all([
          fecth('/api/evidencias/resumen',  {credentials:'include'}),
          fetch('/api/evidencias/mis-evidencias', {credentials:'include'})
        ])

        setResumen(await resResumen.json())
        setEvidencias(await resEvidencias.json())
      }catch (error) {
        console.log('Error:', error)
      }
    }

    //Función para reditar datos una evidencia

    const editarEvidencia = async (id, datos) => {
      try{
      
        await fetch(`/api/evidencias/${id}`,{ 
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(datos),
        credentials:'include'
        })

        setEvidenciaSeleccionada(null)
        recargarDatos()
      }catch (error) {
        console.log('Error:', error)
      }
    }

    const cerrarSesion = async () => {
      await fetch('/api/usuarios/logout', {
        method: 'POST',
        credentials: 'include'
      })
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
        onEditar={(ev) => setEvidenciaSeleccionada(ev)}
      />
      </div>
    )

    
  }
  
  export default Dashboard