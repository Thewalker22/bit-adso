import { useState } from 'react'

function TablaEvidencias({ evidencias, onEntregar, onEditar }) {
  // Guarda el id de la fila en modo edición — null = ninguna
  const [editandoId, setEditandoId] = useState(null)

  // Guarda los valores que el usuario está modificando
  const [datosEdicion, setDatosEdicion] = useState({})

  const activarEdicion = (ev) => {
    setEditandoId(ev.idevidencia)
    setDatosEdicion({
      nombre:       ev.nombre       ?? '',
      url:          ev.url          ?? '',
      fecha_limite: ev.fecha_limite
        ? new Date(ev.fecha_limite).toISOString().slice(0, 16)
        : '',
      estatus:      ev.estatus      ?? 'pendiente',
      url_material: ev.url_material ?? '',
      url_clase:    ev.url_clase    ?? '',
    })
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setDatosEdicion({})
  }

  const guardarEdicion = async () => {
    await onEditar(editandoId, datosEdicion)
    setEditandoId(null)
    setDatosEdicion({})
  }

  return (
    <div>
      <h3>Mis evidencias</h3>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Fecha límite</th>
            <th>Estatus</th>
            <th>URL</th>
            <th>Material</th>
            <th>Clase</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {evidencias.map((ev, index) => (
            <tr key={ev.idevidencia}>
              {editandoId === ev.idevidencia ? (
                // ─── MODO EDICIÓN ───────────────────────────
                <>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      value={datosEdicion.nombre}
                      onChange={(e) => setDatosEdicion({ ...datosEdicion, nombre: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type='datetime-local'
                      value={datosEdicion.fecha_limite}
                      onChange={(e) => setDatosEdicion({ ...datosEdicion, fecha_limite: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={datosEdicion.estatus}
                      onChange={(e) => setDatosEdicion({ ...datosEdicion, estatus: e.target.value })}
                    >
                      <option value='pendiente'>Pendiente</option>
                      <option value='enviada'>Enviada</option>
                      <option value='vencida'>Vencida</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type='url'
                      value={datosEdicion.url}
                      onChange={(e) => setDatosEdicion({ ...datosEdicion, url: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type='url'
                      value={datosEdicion.url_material}
                      onChange={(e) => setDatosEdicion({ ...datosEdicion, url_material: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type='url'
                      value={datosEdicion.url_clase}
                      onChange={(e) => setDatosEdicion({ ...datosEdicion, url_clase: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={guardarEdicion}>💾 Guardar</button>
                    <button onClick={cancelarEdicion}>❌ Cancelar</button>
                  </td>
                </>
              ) : (
                // ─── MODO LECTURA ───────────────────────────
                <>
                  <td>{index + 1}</td>
                  <td>{ev.nombre}</td>
                  <td>
                    {ev.fecha_limite
                      ? new Date(ev.fecha_limite).toLocaleString().slice(0, 16)
                      : 'Sin fecha'}
                  </td>
                  <td>{ev.estatus}</td>
                  <td><a href={ev.url ?? '#'} target="_blank">Entregar</a></td>
                  <td><a href={ev.url_material ?? '#'} target="_blank">M</a></td>
                  <td><a href={ev.url_clase ?? '#'} target="_blank">🎓</a></td>
                  <td>
                    <button
                      onClick={() => onEntregar(ev.idevidencia)}
                      disabled={ev.estatus === 'enviada' ? true : false}
                    >
                      {ev.estatus === 'enviada' ? '✅ Enviada' : 'Entregar'}
                    </button>
                    <button onClick={() => activarEdicion(ev)}>
                      Editar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaEvidencias