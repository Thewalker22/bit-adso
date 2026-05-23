import api from './axios';

// ======================================
// OBTENER TODAS LAS EVIDENCIAS
// ======================================

export const obtenerEvidencias = async () => {

  try {

    const { data } = await api.get(
      '/evidencias/mis-evidencias'
    );

    return {
      ok: true,
      data,
    };

  } catch (error) {

    return {
      ok: false,
      data: error.response?.data,
    };

  }

};


// ======================================
// OBTENER RESUMEN DE EVIDENCIAS
// ======================================

export const obtenerResumen = async () => {

  try {

    const { data } = await api.get(
      '/evidencias/resumen'
    );

    return {
      ok: true,
      data,
    };

  } catch (error) {

    return {
      ok: false,
      data: error.response?.data,
    };

  }

};


// ======================================
// CREAR EVIDENCIA
// ======================================

export const crearEvidencia = async ( datos ) => {

  try {

    const { data } = await api.post(
      '/evidencias',
      datos
    );
  console.log(error);

    return {
      ok: true,
      data,
    };

  } catch (error) {

    return {
      ok: false,
      data: error.response?.data,
    };
  
  }

};

// ======================================
// ACTUALIZAR EVIDENCIA
// ======================================

export const actualizarEvidencia = async (
  id,
  datos
) => {

  try {

    const { data } = await api.put(
      `/evidencias/${id}`,
      datos
    );

    return {
      ok: true,
      data,
    };

  } catch (error) {

    return {
      ok: false,
      data: error.response?.data,
    };

  }

};


// ======================================
// ELIMINAR EVIDENCIA
// ======================================

export const eliminarEvidencia = async (
  id
) => {

  try {

    const { data } = await api.delete(
      `/evidencias/${id}`
    );

    return {
      ok: true,
      data,
    };

  } catch (error) {

    return {
      ok: false,
      data: error.response?.data,
    };

  }

};


// ======================================
// EDITAR EVIDENCIA
// ======================================

export const editarEvidencia = async (
  id,
  evidencia
) => {

  try {

    const { data } = await api.put(
      `/evidencias/${id}`,
      evidencia
    );

    return {
      ok: true,
      data,
    };

  } catch (error) {

    return {
      ok: false,
      data: error.response?.data,
    };

  }

};