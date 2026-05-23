import { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { useRouter } from 'expo-router';

import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';

import {
  registrarUsuario,
  cargarProg,
} from '../../services/usuariosService';


// ===============================
// VALIDACIONES
// ===============================

const registroSchema = z.object({

  nombre: z
    .string()
    .min(3, 'El nombre es obligatorio')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El nombre solo debe contener letras'
    ),

  usuario: z
    .string()
    .min(4, 'El usuario debe tener mínimo 4 caracteres'),

  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),

  idprograma: z
    .string()
    .min(1, 'Debes seleccionar un programa'),

});

type RegistroFormData = z.infer<typeof registroSchema>;


// ===============================
// COMPONENTE
// ===============================

export default function RegisterScreen() {

  const router = useRouter();

  const [programas, setProgramas] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [errorServer, setErrorServer] = useState('');


  // ===============================
  // REACT HOOK FORM
  // ===============================

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),

    defaultValues: {
      nombre: '',
      usuario: '',
      contrasena: '',
      idprograma: '',
    },
  });


  // ===============================
  // CARGAR PROGRAMAS
  // ===============================

  useEffect(() => {
    console.log('PROGRAMAS ACTUALIZADOS:', programas);

    const obtenerProgramas = async () => {

      try {

        const datos = await cargarProg();

        if (datos.ok) {
          setProgramas(datos.data);
        }

      } catch (error) {

        console.log('Error cargando programas', error);

      }
    };

    obtenerProgramas();

  }, []);

  console.log(programas);

  // ===============================
  // REGISTRO
  // ===============================

  const onSubmit = async (data: RegistroFormData) => {

    try {

      setLoading(true);

      setErrorServer('');

      await registrarUsuario({
        nombre: data.nombre,
        usuario: data.usuario,
        contraseña: data.contrasena,
        idprograma: data.idprograma,
      });

      router.replace('/auth/login');

    } catch (error: any) {

      setErrorServer(
        error.response?.data?.error ||
        'Error al conectar con el servidor'
      );

    } finally {

      setLoading(false);

    }
  };


  // ===============================
  // UI
  // ===============================
  console.log(programas);

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >

      <View style={styles.card}>

        <Text style={styles.title}>
          Registro de aprendiz
        </Text>


        {/* ERROR SERVIDOR */}

        {errorServer ? (
          <Text style={styles.errorServer}>
            {errorServer}
          </Text>
        ) : null}


        {/* NOMBRE */}

        <Text style={styles.label}>
          Nombre completo
        </Text>

        <Controller
          control={control}
          name="nombre"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Tu nombre completo"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.nombre && (
          <Text style={styles.errorText}>
            {errors.nombre.message}
          </Text>
        )}


        {/* USUARIO */}

        <Text style={styles.label}>
          Usuario
        </Text>

        <Controller
          control={control}
          name="usuario"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.usuario && (
          <Text style={styles.errorText}>
            {errors.usuario.message}
          </Text>
        )}


        {/* CONTRASEÑA */}

        <Text style={styles.label}>
          Contraseña
        </Text>

        <Controller
          control={control}
          name="contrasena"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Tu contraseña"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.contrasena && (
          <Text style={styles.errorText}>
            {errors.contrasena.message}
          </Text>
        )}


        {/* PROGRAMAS */}

        <Text style={styles.label}>
          Programa
        </Text>

        <Controller
          control={control}
          name="idprograma"
          render={({ field: { onChange, value } }) => (

            <View style={styles.pickerContainer}>

              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >

                <Picker.Item
                  label="Selecciona un programa"
                  value=""
                />

                {programas.map((programa) => (

                  <Picker.Item
                    key={programa.idprograma}
                    label={`${programa.nombre} - ${programa.ficha}`}
                    value={programa.idprograma.toString()}
                  />

                ))}

              </Picker>
          
            </View>
            
          )}
        />
  

        {errors.idprograma && (
          <Text style={styles.errorText}>
            {errors.idprograma.message}
          </Text>
        )}

        {/* BOTÓN */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >

          {loading ? (

            <ActivityIndicator color="#FFFFFF" />

          ) : (

            <Text style={styles.buttonText}>
              Crear cuenta
            </Text>

          )}

        </TouchableOpacity>


        {/* LOGIN */}

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => router.push('/auth/login')}
        >

          <Text style={styles.loginText}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}


// ===============================
// ESTILOS
// ===============================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#111827',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    marginBottom: 8,
    overflow: 'hidden',
  },

  button: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  loginContainer: {
    marginTop: 24,
  },

  loginText: {
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '600',
  },

  errorText: {
    color: '#DC2626',
    marginBottom: 12,
    fontSize: 13,
  },

  errorServer: {
    color: '#DC2626',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },

});