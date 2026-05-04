import { useEffect } from 'react'
import { useState} from 'react'

function FormEvidencia ({onCrear, onEditar, evidencia}) {
 const [nombre,         setNombre]          =useState('')
 const [url,            setUrl]             =useState('')
 const [fechaLimite,    setFechaLimite]     =useState('')
 const [urlMaterial,    setUrlMaterial]     =useState('')
 const [urlClase,       setUrlClase]        =useState('')
 const [error,          setError]           =useState('')

 // Cuando llega una evidencia para editar, llena los input
useEffect(() => {
    if(evidencia){
        setNombre(evidencia.nombre ?? '')
        setUrl(evidencia.url ?? '')
        setFechaLimite(
            evidencia.fecha_limite
            ? new Date(evidencia.fecha_limite).toISOString().slice(0, 16)
            : ''
    )
    setUrlMaterial(evidencia.url_material ?? '')
    setUrlClase(evidencia.url_clase ?? '')
    } else {
// Si no hay evidencia, limpia el formulario
    setNombre('')
    setUrl('')
    setFechaLimite('')
    setUrlMaterial('')
    setUrlClase('')    
    }


}, [evidencia]) // Se ejecuta cada vez que evidencia cambia

const handleCrear = async () => {
    if (!nombre) {
      setError('El nombre es obligatorio')
      return
    }

    try {
      const respuesta = await fetch('/api/evidencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          url,
          fecha_limite: fechaLimite,
          url_material: urlMaterial,
          url_clase:    urlClase,
          idcomponente: 1
        }),
        credentials: 'include'
      })

      if (!respuesta.ok) {
        const resultado = await respuesta.json()
        setError(resultado.error)
        return
      }

      // Limpiar formulario
      setNombre('')
      setUrl('')
      setFechaLimite('')
      setUrlMaterial('')
      setUrlClase('')
      setError(null)

      // Avisar al Dashboard que se creó una evidencia
      onCrear()

    } catch (err) {
      console.log('Error exacto:', err.message)
      setError('Error al conectar con el servidor')
    }
  }

return (
   <div>
    <h3>Nueva evidencia</h3>

    {error && <p style={{color:'red'}}> {error}</p>}
    <div>
        <label>Nombre</label>
        <input
        type="text" 
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder='Nombre de la evidencia'
         />
    </div>

    <div>
        <label>Url de entrega</label>
        <input 
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder='https//...'
        />
    </div>

    <div>
        <label> Fecha limite </label>
        <input 
        type="datetime-local"
        value={fechaLimite}
        onChange={(e) => setFechaLimite(e.target.value)}
         />
    </div>

    <div>
        <label>Url Material</label>
        <input 
        type="url" 
        value={urlMaterial}
        onChange={(e) => setUrlMaterial(e.target.value)}
        />
    </div>

    <div>Url clase</div>
    <input 
    type="url"
    value={urlClase}
    onChange={(e) => setUrlClase(e.target.value)}
    />

    <button onClick={handleCrear}> Crear evidencia</button>

   </div>
)
}
export default FormEvidencia
