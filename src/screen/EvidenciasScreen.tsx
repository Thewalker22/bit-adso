import { View, Text, FlatList, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, Alert, } from 'react-native';
import { useEffect, useState,} from 'react';
import EvidenciaCard from '../components/EvidenciasCard';
import FormEvidencia from '../components/FormEvidencias';
import { obtenerEvidencias, eliminarEvidencia, } from '../../services/evidenciasServices';
  
  
  // ======================================
  // COMPONENTE
  // ======================================
  
  export default function EvidenciasScreen() {
  
    // ======================================
    // STATES
    // ======================================
  
    const [evidencias, setEvidencias] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [evidenciaEditar, setEvidenciaEditar] = useState<any>(null);
  

    // ======================================
    // CARGAR EVIDENCIAS
    // ======================================
  
    const cargarEvidencias = async () => {
  
      try {
  
        setLoading(true);
  
        const resultado =
          await obtenerEvidencias();
  
        if(resultado.ok){
  
          setEvidencias(resultado.data);
  
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
  
      cargarEvidencias();
  
    }, []);
  
  
    // ======================================
    // ELIMINAR
    // ======================================
  
    const handleEliminar = (
      id: number
    ) => {
  
      Alert.alert(
  
        'Eliminar',
  
        '¿Desea eliminar esta evidencia?',
  
        [
  
          {
            text: 'Cancelar',
            style: 'cancel',
          },
  
          {
            text: 'Eliminar',
  
            style: 'destructive',
  
            onPress: async () => {
  
              const resultado =
                await eliminarEvidencia(id);
  
              if(resultado.ok){
  
                cargarEvidencias();
  
              }
  
            },
  
          },
  
        ]
  
      );
  
    };
  
  
    // ======================================
    // EDITAR
    // ======================================
  
    const handleEditar = (
      evidencia: any
    ) => {
  
      setEvidenciaEditar(evidencia);
  
      setModalVisible(true);
  
    };
  
  
    // ======================================
    // NUEVA EVIDENCIA
    // ======================================
  
    const handleNueva = () => {
  
      setEvidenciaEditar(null);
  
      setModalVisible(true);
  
    };
  
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
  
      <View style={styles.container}>
  
  
        {/* HEADER */}
  
        <View style={styles.header}>
  
          <Text style={styles.title}>
  
            Evidencias
  
          </Text>
  
  
          <TouchableOpacity
  
            style={styles.buttonNueva}
  
            onPress={handleNueva}
  
          >
  
            <Text style={styles.buttonNuevaText}>
  
              + Nueva
  
            </Text>
  
          </TouchableOpacity>
  
        </View>
  
  
        {/* LISTA */}
  
        <FlatList
  
          data={evidencias}
  
          keyExtractor={(item) =>
            item.idevidencia.toString()
          }
  
          showsVerticalScrollIndicator={false}
  
          renderItem={({ item }) => (
  
            <EvidenciaCard
  
              evidencia={item}
  
              onEditar={() =>
                handleEditar(item)
              }
  
              onEliminar={() =>
                handleEliminar(
                  item.idevidencia
                )
              }
  
            />
  
          )}
  
        />
  
  
        {/* MODAL */}
  
        <Modal
  
          visible={modalVisible}
  
          animationType='slide'
  
        >
  
          <View style={styles.modalContainer}>
  
  
            {/* CERRAR */}
  
            <TouchableOpacity
  
              style={styles.cerrar}
  
              onPress={() =>
                setModalVisible(false)
              }
  
            >
  
              <Text style={styles.cerrarText}>
  
                Cerrar
  
              </Text>
  
            </TouchableOpacity>
  
  
            {/* FORM */}
  
            <FormEvidencia
  
              evidencia={evidenciaEditar}
  
              onSuccess={() => {
  
                setModalVisible(false);
  
                cargarEvidencias();
  
              }}
  
            />
  
          </View>
  
        </Modal>
  
      </View>
  
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
  
    header: {
  
      flexDirection: 'row',
  
      justifyContent: 'space-between',
  
      alignItems: 'center',
  
      marginBottom: 20,
  
    },
  
    title: {
  
      color: '#fff',
  
      fontSize: 28,
  
      fontWeight: 'bold',
  
    },
  
    buttonNueva: {
  
      backgroundColor: '#2563eb',
  
      paddingHorizontal: 16,
  
      paddingVertical: 10,
  
      borderRadius: 12,
  
    },
  
    buttonNuevaText: {
  
      color: '#fff',
  
      fontWeight: 'bold',
  
    },
  
    modalContainer: {
  
      flex: 1,
  
      backgroundColor: '#020617',
  
      paddingTop: 50,
  
    },
  
    cerrar: {
  
      alignSelf: 'flex-end',
  
      marginRight: 20,
  
      marginBottom: 10,
  
    },
  
    cerrarText: {
  
      color: '#ef4444',
  
      fontWeight: 'bold',
  
      fontSize: 16,
  
    },
  
  });