import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

import { useRouter } from 'expo-router';

import { login } from '../../services/usuariosService';

export default function LoginScreen() {

  const router = useRouter();

  const [usuario, setUsuario] = useState('');

  const [contrasena, setContrasena] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');


  // ===============================
  // LOGIN
  // ===============================

  const iniciarSesion = async () => {

    // Validar campos vacíos
    if(!usuario || !contrasena){

      setError('Todos los campos son obligatorios');

      return;

    }

    try{

      setLoading(true);

      setError('');

      const resultado = await login(
        usuario,
        contrasena
      );

      console.log(resultado);

      // LOGIN EXITOSO
      if(resultado.ok){

        router.replace('/(tabs)');

      }else{

        setError(
          resultado.data?.error ||
          'Credenciales incorrectas'
        );

      }

    }catch(error){

      console.log(error);

      setError(
        'Error al conectar con el servidor'
      );

    }finally{

      setLoading(false);
    }

  };


  return (

    <View style={styles.container}>


      {/* LOGO */}

      <Image
        source={require('../../assets/images/logo-adso.png')}
        style={styles.logo}
        resizeMode='contain'
      />


      {/* TITULO */}

      <Text style={styles.title}>
        BIT-ADSO
      </Text>

      <Text style={styles.subtitle}>
        Iniciar Sesión
      </Text>


      {/* INPUT USUARIO */}

      <TextInput
        placeholder='Usuario'
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />


      {/* INPUT PASSWORD */}

      <TextInput
        placeholder='Contraseña'
        secureTextEntry
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
      />


      {/* ERROR */}

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}


      {/* BOTON */}

      <TouchableOpacity
        style={styles.button}
        onPress={iniciarSesion}
      >

        {
          loading ? (
            <ActivityIndicator color='#fff'/>
          ) : (
            <Text style={styles.buttonText}>
              Ingresar
            </Text>
          )
        }

      </TouchableOpacity>


      {/* REGISTER */}

      <TouchableOpacity
        onPress={() =>
          router.push('/auth/register')
        }
      >

        <Text style={styles.registerText}>
          ¿No tienes cuenta? Regístrate
        </Text>

      </TouchableOpacity>

    </View>

  );

}


// ===============================
// ESTILOS
// ===============================

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    padding: 25,

    backgroundColor: '#0f172a',

  },

  logo: {

    width: 140,

    height: 140,

    alignSelf: 'center',

    marginBottom: 20,

  },

  title: {

    fontSize: 32,

    fontWeight: 'bold',

    color: '#fff',

    textAlign: 'center',

  },

  subtitle: {

    fontSize: 18,

    color: '#94a3b8',

    textAlign: 'center',

    marginBottom: 40,

  },

  input: {

    backgroundColor: '#1e293b',

    color: '#fff',

    padding: 15,

    borderRadius: 12,

    marginBottom: 15,

    fontSize: 16,

  },

  button: {

    backgroundColor: '#2563eb',

    padding: 15,

    borderRadius: 12,

    alignItems: 'center',

    marginTop: 10,

  },

  buttonText: {

    color: '#fff',

    fontWeight: 'bold',

    fontSize: 16,

  },

  error: {

    color: '#ef4444',

    marginBottom: 10,

    textAlign: 'center',

  },

  registerText: {

    color: '#60a5fa',

    textAlign: 'center',

    marginTop: 20,

  },

});