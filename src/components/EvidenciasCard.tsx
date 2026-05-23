import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { Linking } from 'react-native';
import { Ionicons, } from '@expo/vector-icons';
  
  // ======================================
  // PROPS
  // ======================================
  
  interface Props {
  
    evidencia: any;
  
    onEditar?: () => void;
  
    onEliminar?: () => void;
  
  }
  
  
  // ======================================
  // COMPONENTE
  // ======================================
  
  export default function EvidenciaCard({ evidencia, onEditar, onEliminar,}: Props) {
  
    // ======================================
    // FORMATEAR FECHA
    // ======================================
  
    const fechaFormateada = new Date(
      evidencia.fecha_limite
    ).toLocaleDateString();
  
  
    // ======================================
    // COLOR ESTADO
    // ======================================
  
    const obtenerColorEstado = () => {
  
      switch(evidencia.estatus){
  
        case 'enviada':
          return '#22c55e';
  
        case 'vencida':
          return '#ef4444';
  
        default:
          return '#facc15';
  
      }
  
    };
  
    return (
  
      <View style={styles.card}>
  
  
        {/* HEADER */}
  
        <View style={styles.header}>
  
          <Text style={styles.nombre}>
  
            {evidencia.nombre}
  
          </Text>
  
        </View>
  
  
        {/* ESTADO */}
  
        <View
          style={[
            styles.estadoContainer,
            {
              backgroundColor:
                obtenerColorEstado()
            }
          ]}
        >
  
          <Text style={styles.estadoText}>
  
            {evidencia.estatus}
  
          </Text>
  
        </View>
  
  
        {/* FECHA */}
  
        <Text style={styles.fecha}>
  
          Fecha límite:
          {' '}
          {fechaFormateada}
  
        </Text>
  
  
        {/* URLS */}

        <Text style={styles.link}>
  
          url entrega:
          {' '}
          {evidencia.url}

        </Text>

        <TouchableOpacity
           style={styles.linkButton}
           onPress={() =>
           Linking.openURL(
           evidencia.url_material
          )}
        >

          <Ionicons
            name="document-text-outline"
            size={22}
            color="#60a5fa"
          />

          <Text style={styles.linkText}>
            Material
          </Text>

        </TouchableOpacity>
  
  
        <Text style={styles.link}>
  
          Clase:
          {''}
          {evidencia.url_clase}
  
        </Text>
  
  
        {/* BOTONES */}
  
        <View style={styles.actions}>
  
  
          {/* EDITAR */}
  
          <TouchableOpacity
  
            style={styles.editButton}
  
            onPress={onEditar}
  
          >
  
            <Ionicons
              name='create'
              size={18}
              color='#fff'
            />
  
            <Text style={styles.buttonText}>
  
              Editar
  
            </Text>
  
          </TouchableOpacity>
  
  
          {/* ELIMINAR */}
  
          <TouchableOpacity
  
            style={styles.deleteButton}
  
            onPress={onEliminar}
  
          >
  
            <Ionicons
              name='trash'
              size={18}
              color='#fff'
            />
  
            <Text style={styles.buttonText}>
  
              Eliminar
  
            </Text>
  
          </TouchableOpacity>
  
        </View>
  
      </View>
  
    );
  
  }
  
  
  // ======================================
  // ESTILOS
  // ======================================
  
  const styles = StyleSheet.create({
  
    card: {
  
      backgroundColor: '#0f172a',
  
      padding: 18,
  
      borderRadius: 18,
  
      marginBottom: 16,
  
    },
  
    header: {
  
      marginBottom: 10,
  
    },
  
    nombre: {
  
      color: '#fff',
  
      fontSize: 20,
  
      fontWeight: 'bold',
  
    },
  
    estadoContainer: {
  
      alignSelf: 'flex-start',
  
      paddingHorizontal: 12,
  
      paddingVertical: 6,
  
      borderRadius: 20,
  
      marginBottom: 12,
  
    },
  
    estadoText: {
  
      color: '#fff',
  
      fontWeight: 'bold',
  
    },
  
    fecha: {
  
      color: '#cbd5e1',
  
      marginBottom: 8,
  
    },
  
    link: {
  
      color: '#60a5fa',
  
      marginBottom: 4,
  
    },
  
    linkText: {
      color: '#ffffff',
    },

    actions: {
  
      flexDirection: 'row',
  
      justifyContent: 'space-between',
  
      marginTop: 16,
  
    },
  
    editButton: {
  
      backgroundColor: '#2563eb',
  
      flexDirection: 'row',
  
      alignItems: 'center',
  
      gap: 8,
  
      padding: 12,
  
      borderRadius: 12,
  
      flex: 1,
  
      justifyContent: 'center',
  
      marginRight: 8,
  
    },
  
    deleteButton: {
  
      backgroundColor: '#dc2626',
  
      flexDirection: 'row',
  
      alignItems: 'center',
  
      gap: 8,
  
      padding: 12,
  
      borderRadius: 12,
  
      flex: 1,
  
      justifyContent: 'center',
  
    },
  
    buttonText: {
  
      color: '#fff',
  
      fontWeight: 'bold',
  
    },
  
  
    
  });