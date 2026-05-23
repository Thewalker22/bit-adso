import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  
  import { logout } from '../../services/usuariosService';
  
  import { useRouter } from 'expo-router';
  
  export default function PerfilScreen() {
  
    const router = useRouter();
  
    const cerrarSesion = async () => {
  
      await logout();
  
      router.replace('/auth/login');
  
    };
  
    return (
  
      <View style={styles.container}>
  
        <Text style={styles.title}>
          Perfil
        </Text>
  
  
        <TouchableOpacity
          style={styles.button}
          onPress={cerrarSesion}
        >
  
          <Text style={styles.buttonText}>
            Cerrar sesión
          </Text>
  
        </TouchableOpacity>
  
      </View>
  
    );
  
  }
  
  const styles = StyleSheet.create({
  
    container: {
  
      flex: 1,
  
      justifyContent: 'center',
  
      alignItems: 'center',
  
      backgroundColor: '#020617',
  
    },
  
    title: {
  
      color: '#fff',
  
      fontSize: 24,
  
      fontWeight: 'bold',
  
      marginBottom: 20,
  
    },
  
    button: {
  
      backgroundColor: '#dc2626',
  
      padding: 15,
  
      borderRadius: 12,
  
    },
  
    buttonText: {
  
      color: '#fff',
  
      fontWeight: 'bold',
  
    },
  
  });