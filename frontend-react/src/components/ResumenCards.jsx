import '../styles/resumen.css'

function ResumenCards({ resumen }) {
    return (
      <div className="resumen-grid">

      <div className="resumen-card total-card">
  
          <h3>Total</h3>
  
          <p>{resumen.total}</p>
  
      </div>
  
      <div className="resumen-card enviadas-card">
  
          <h3>Eviadas</h3>
  
          <p>{resumen.enviadas}</p>
  
      </div>
  
      <div className="resumen-card pendientes-card">
  
          <h3>Pendientes</h3>
  
          <p>{resumen.pendientes}</p>
  
      </div>
  
      <div className="resumen-card vencidas-card">
  
          <h3>Vencidas</h3>
  
          <p>{resumen.vencidas}</p>
  
      </div>
  
  </div>
    )
  }
  
  export default ResumenCards