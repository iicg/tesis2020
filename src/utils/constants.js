export default {
  RESERVAS_MAX_FREE: 5,
  RESERVAS_MAX_PREMIUM: 10,
  TIPOS_PLAN: {
    estudiante: 'Plan de Estudiante',
    inicial: 'Plan Inicial',
    intermedio: 'Plan Intermedio',
    pro: 'Plan PRO sín Límite',
  },
  ERRORES: {
    'auth/requires-recent-login':
      'Esta operación requiere un inicio de sesión reciente. Vuelva a ingresar a su cuenta.',
    'auth/invalid-email': 'El email ingresado no es valido.',
    'auth/network-request-failed': 'Error de conexión',
    'auth/too-many-requests': '¡Espera un poco!',
  },
  IMC: {
    indices: {
      bajo: [0, 18.5],
      adecuado: [18.5, 24.9],
      sobrepeso: [25.5, 29.9],
      obesidad1: [30.0, 34.9],
      obesidad2: [35.0, 39.9],
      obesidad3: [40, 100],
    },
    nombres: {
      bajo: 'Bajo peso',
      adecuado: 'Peso adecuado',
      sobrepeso: 'Sobrepeso',
      obesidad1: 'Obesidad grado 1',
      obesidad2: 'Obesidad grado 2',
      obesidad3: 'Obesidad grado 3',
    },
    colores: {
      bajo: '#5DC8CB',
      adecuado: '#A2CB48',
      sobrepeso: '#CECC4C',
      obesidad1: '#F59E45',
      obesidad2: '#F1716A',
      obesidad3: '#BB4841',
    },
  },
};
