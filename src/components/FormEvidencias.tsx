import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { crearEvidencia, editarEvidencia, } from '../../services/evidenciasServices';


// ======================================
// VALIDACIONES
// ======================================

const evidenciaSchema = z.object({

  nombre: z
    .string()
    .min(3, 'El nombre es obligatorio'),

  url: z
    .string()
    .url('Debe ser una URL válida'),

  fecha_limite: z
    .string()
    .min(1, 'La fecha es obligatoria'),

  url_material: z
    .string()
    .url('URL material inválida'),

  url_clase: z
    .string()
    .url('URL clase inválida'),

  estatus: z
    .string(),
});

type EvidenciaFormData =
  z.infer<typeof evidenciaSchema>;


// ======================================
// PROPS
// ======================================

interface Props {

  evidencia?: any;

  onSuccess?: () => void;

}


// ======================================
// COMPONENTE
// ======================================

export default function FormEvidencia({

  evidencia,

  onSuccess,

}: Props) {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState('');


  // ======================================
  // REACT HOOK FORM
  // ======================================

  const {

    control,

    handleSubmit,

    reset,

    formState: { errors },

  } = useForm<EvidenciaFormData>({

    resolver:
      zodResolver(evidenciaSchema),

    defaultValues: {

      nombre: '',

      url: '',

      fecha_limite: '',

      url_material: '',

      url_clase: '',

      estatus: '',

    },

  });


  // ======================================
  // CARGAR DATOS EDICIÓN
  // ======================================

  useEffect(() => {

    if(evidencia){

      reset({

        nombre:
          evidencia.nombre || '',

        url:
          evidencia.url || '',

        fecha_limite:
          evidencia.fecha_limite || '',

        url_material:
          evidencia.url_material || '',

        url_clase:
          evidencia.url_clase || '',
        

        estatus: 
          evidencia.estatus || 'pendiente',

        url_evidencia:
          evidencia.url_evidencia || '',

      });

    }

  }, [evidencia]);


  // ======================================
  // SUBMIT
  // ======================================

  const onSubmit = async (
    data: EvidenciaFormData
  ) => {
    console.log('onSubmit')
    try {

      setLoading(true);

      setErrorServer('');


      // ======================================
      // EDITAR
      // ======================================

      if(evidencia){

        const resultado =
          await editarEvidencia(

            evidencia.idevidencia,
          
            {
              ...data,
          
              fecha_limite:
                new Date(data.fecha_limite)
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' '),
          
            }
          
          )

        if(!resultado.ok){

          setErrorServer(
            resultado.data?.error
          );

          return;

        }

      }

      // ======================================
      // CREAR
      // ======================================

      else {

        const resultado =
          await crearEvidencia({
      
            ...data,
      
            fecha_limite:
              new Date(data.fecha_limite)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' '),
      
            idcomponente: 1,
      
          });
      
        if(!resultado.ok){
      
          setErrorServer(
            resultado.data?.error
          );
      
          return;
      
        }
      
      }


      // ======================================
      // LIMPIAR
      // ======================================

      reset();

      if(onSuccess){

        onSuccess();

      }

    } catch(error){

      console.log(error);

      setErrorServer(
        'Error al conectar con servidor'
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.title}>

        {
          evidencia
          ? 'Editar evidencia'
          : 'Nueva evidencia'
        }

      </Text>


      {/* ERROR SERVER */}

      {
        errorServer ? (

          <Text style={styles.error}>

            {errorServer}

          </Text>

        ) : null
      }


      {/* NOMBRE */}

      <Controller

        control={control}

        name='nombre'

        render={({ field: {
          onChange,
          value
        } }) => (

          <>

            <TextInput

              placeholder='Nombre'

              style={styles.input}

              value={value}

              onChangeText={onChange}

            />

            {
              errors.nombre && (

                <Text style={styles.error}>

                  {errors.nombre.message}

                </Text>

              )
            }

          </>

        )}

      />


      {/* URL */}

      <Controller

        control={control}

        name='url'

        render={({ field: {
          onChange,
          value
        } }) => (

          <>

            <TextInput

              placeholder='URL entrega'

              style={styles.input}

              value={value}

              onChangeText={onChange}

            />

            {
              errors.url && (

                <Text style={styles.error}>

                  {errors.url.message}

                </Text>

              )
            }

          </>

        )}

      />


      {/* FECHA */}

      <Controller

control={control}

name="fecha_limite"

render={({ field: {
  onChange,
  value
} }) => (

  <>

    {/* BOTÓN FECHA */}

    <TouchableOpacity

      style={styles.input}

      onPress={() =>
        setMostrarCalendario(true)
      }
    >

      <Text style={{ color: '#fff' }}>

        {
          value
            ? new Date(value)
                .toLocaleString()
            : 'Seleccionar fecha y hora'
        }

      </Text>

    </TouchableOpacity>


    {/* CALENDARIO */}

    {
      mostrarCalendario && (

        <DateTimePicker

          value={
            value
              ? new Date(value)
              : new Date()
          }

          mode="date"

          display="default"

          onChange={(
            event,
            selectedDate
          ) => {

            setMostrarCalendario(false);

            if(selectedDate){

              onChange(
                selectedDate.toISOString()
              );

            }

          }}

        />

      )
    }


    {/* ERROR */}

    {
      errors.fecha_limite && (

        <Text style={styles.error}>

          {
            errors.fecha_limite.message
          }

        </Text>

      )
    }

  </>

)}

/>

      {/* URL MATERIAL */}

      <Controller

        control={control}

        name='url_material'

        render={({ field: {
          onChange,
          value
        } }) => (

          <>

            <TextInput

              placeholder='URL material'

              style={styles.input}

              value={value}

              onChangeText={onChange}

            />

            {
              errors.url_material && (

                <Text style={styles.error}>

                  {errors.url_material.message}

                </Text>

              )
            }

          </>

        )}

      />


      {/* URL CLASE */}

      <Controller

        control={control}

        name='url_clase'

        render={({ field: {
          onChange,
          value
        } }) => (

          <>

            <TextInput

              placeholder='URL clase'

              style={styles.input}

              value={value}

              onChangeText={onChange}

            />

            {
              errors.url_clase && (

                <Text style={styles.error}>

                  {errors.url_clase.message}

                </Text>

              )
            }

          </>

        )}

      />

       {/* URL EVIDENCIA*/}

       <Controller

control={control}

name='url_evidencia'

render={({ field: {
  onChange,
  value
} }) => (

  <>

    <TextInput

      placeholder='URL evidencia'

      style={styles.input}

      value={value}

      onChangeText={onChange}

    />

    {
      errors.url_evidencia && (

        <Text style={styles.error}>

          {errors.url_evidencia.message}

        </Text>

      )
    }

  </>

)}

/>


      {/* Estatus */}

      {/* ESTADO */}

<Controller

control={control}

name='estatus'

render={({ field: {
  onChange,
  value
} }) => (

  <>

    <View style={styles.pickerContainer}>

      <Picker

        selectedValue={value}

        onValueChange={onChange}

        dropdownIconColor="#fff"

        style={styles.picker}

      >

        <Picker.Item
          label="Pendiente"
          value="pendiente"
        />

        <Picker.Item
          label="Enviada"
          value="enviada"
        />

        <Picker.Item
          label="Vencida"
          value="vencida"
        />

      </Picker>

    </View>

    {
      errors.estatus && (

        <Text style={styles.error}>

          {errors.estatus.message}

        </Text>

      )
    }

  </>

)}

/>


      {/* BOTÓN */}

      <TouchableOpacity

        style={styles.button}

        onPress={handleSubmit(onSubmit)}

      >
        {
          loading ? (

            <ActivityIndicator
              color='#be67fb'
            />

          ) : (

            <Text style={styles.buttonText}>

              {
                evidencia
                ? 'Actualizar'
                : 'Crear evidencia'
              }

            </Text>
          )
          
        }
 
      </TouchableOpacity>
    

    </ScrollView>

  );

}

// ======================================
// ESTILOS
// ======================================

const styles = StyleSheet.create({

  container: {

    padding: 20,

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    color: '#fff',

    marginBottom: 20,

  },

  input: {

    backgroundColor: '#1e293b',

    color: '#fff',

    padding: 15,

    borderRadius: 12,

    marginBottom: 10,

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

  pickerContainer: {

    backgroundColor: '#1e293b',
  
    borderRadius: 12,
  
    marginBottom: 10,
  
  },
  
  picker: {
  
    color: '#fff',
  
  },

  error: {

    color: '#ef4444',

    marginBottom: 10,

  },

});