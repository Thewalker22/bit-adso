import { View, Text, StyleSheet, ScrollView, ActivityIndicator,} from 'react-native';
import { useEffect, useState, } from 'react';
import ResumenCards from '../components/ResumenCards';
import { obtenerResumen, } from '../../services/evidenciasServices';
  
  
  // ======================================
  // COMPONENTE
  // ======================================
  
  export default function HomeScreen() {
  
  
    // ======================================
    // STATES
    // ======================================
  
    const [resumen, setResumen] = useState<any>(null);
  
    const [loading, setLoading] = useState(true);
  
  
    // ======================================
    // CARGAR RESUMEN
    // ======================================
  
    const cargarResumen = async () => {
  
      try {
  
        setLoading(true);
  
        const resultado =
          await obtenerResumen();
  
        if(resultado.ok){
  
          setResumen(resultado.data);
  
        }
  
      } catch(error){
  
        console.log(error);
  
      } finally {
  
        setLoading(false);
  
      }
  
    };
  
  
    // ======================================
    // USE EFFECT
    // ======================================
  
    useEffect(() => {
  
      cargarResumen();
  
    }, []);
  
  
    // ======================================
    // LOADING
    // ======================================
  
    if(loading){
  
      return (
  
        <View style={styles.loading}>
  
          <ActivityIndicator
            size='large'
            color='#2563eb'
          />
  
        </View>
  
      );
  
    }
  
  
    return (
  
      <ScrollView style={styles.container}>
  
  
        {/* TÍTULO */}
  
        <Text style={styles.title}>
  
          Dashboard
  
        </Text>
  
  
        {/* SUBTÍTULO */}
  
        <Text style={styles.subtitle}>
  
          Resumen general de evidencias
  
        </Text>
  
  
        {/* RESUMEN */}
  
        <ResumenCards
          resumen={resumen}
        />
  
      </ScrollView>
  
    );
  
  }
  
  
  // ======================================
  // ESTILOS
  // ======================================
  
  const styles = StyleSheet.create({
  
    container: {
  
      flex: 1,
  
      backgroundColor: '#020617',
  
      padding: 20,
  
    },
  
    loading: {
  
      flex: 1,
  
      justifyContent: 'center',
  
      alignItems: 'center',
  
      backgroundColor: '#020617',
  
    },
  
    title: {
  
      color: '#fff',
  
      fontSize: 32,
  
      fontWeight: 'bold',
  
      marginBottom: 8,
  
    },
  
    subtitle: {
  
      color: '#94a3b8',
  
      fontSize: 16,
  
      marginBottom: 24,
  
    },
  
  });