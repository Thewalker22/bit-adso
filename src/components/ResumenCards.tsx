import { View, Text, StyleSheet, } from 'react-native';
  
  // ======================================
  // PROPS
  // ======================================
  
  interface Props {
  
    resumen: {
  
      total: number;
  
      pendientes: number;
  
      vencidas: number;
  
      enviadas: number;
  
    };
  
  }
  
  // ======================================
  // COMPONENTE
  // ======================================
  
  export default function ResumenCards({
  
    resumen,
  
  }: Props) {
  
    return (
  
      <View style={styles.container}>
  
  
        {/* TOTAL */}
  
        <View
          style={[
            styles.card,
            styles.totalCard
          ]}
        >
  
          <Text style={styles.numero}>
  
            {resumen.total}
  
          </Text>
  
          <Text style={styles.label}>
  
            Total
  
          </Text>
  
        </View>
  
  
        {/* PENDIENTES */}
  
        <View
          style={[
            styles.card,
            styles.pendienteCard
          ]}
        >
  
          <Text style={styles.numero}>
  
            {resumen.pendientes}
  
          </Text>
  
          <Text style={styles.label}>
  
            Pendientes
  
          </Text>
  
        </View>
  
  
        {/* RETRASADAS */}
  
        <View
          style={[
            styles.card,
            styles.retrasadaCard
          ]}
        >
  
          <Text style={styles.numero}>
  
            {resumen.vencidas}
  
          </Text>
  
          <Text style={styles.label}>
  
            Vencidas
  
          </Text>
  
        </View>
  
  
        {/* ENVIADAS */}
  
        <View
          style={[
            styles.card,
            styles.enviadaCard
          ]}
        >
  
          <Text style={styles.numero}>
  
            {resumen.enviadas}
  
          </Text>
  
          <Text style={styles.label}>
  
            Enviadas
  
          </Text>
  
        </View>
  
      </View>
  
    );
  
  }
  
  
  // ======================================
  // ESTILOS
  // ======================================
  
  const styles = StyleSheet.create({
  
    container: {
  
      flexDirection: 'row',
  
      flexWrap: 'wrap',
  
      justifyContent: 'space-between',
  
    },
  
    card: {
  
      width: '48%',
  
      padding: 20,
  
      borderRadius: 18,
  
      marginBottom: 16,
  
    },
  
    numero: {
  
      color: '#fff',
  
      fontSize: 28,
  
      fontWeight: 'bold',
  
      marginBottom: 8,
  
    },
  
    label: {
  
      color: '#fff',
  
      fontSize: 16,
  
    },
  
    totalCard: {
  
      backgroundColor: '#2563eb',
  
    },
  
    pendienteCard: {
  
      backgroundColor: '#f59e0b',
  
    },
  
    retrasadaCard: {
  
      backgroundColor: '#dc2626',
  
    },
  
    enviadaCard: {
  
      backgroundColor: '#16a34a',
  
    },
  
  });