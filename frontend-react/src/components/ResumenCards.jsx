function ResumenCards({ resumen }) {
    return (
        <table border={1}>
        <thead>
            <tr>
                <th><strong>Total</strong></th>
                <th><strong>Evidencias</strong></th>
                <th><strong>Pendientes</strong></th>
                <th><strong>Vencidas</strong></th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>{resumen.total}</p></td>
            <td><p>{resumen.enviadas}</p></td>
            <td><p>{resumen.pendientes}</p></td>
            <td><p>{resumen.vencidas}</p></td>
          </tr>
        </tbody>
    
    </table>
    )
  }
  
  export default ResumenCards