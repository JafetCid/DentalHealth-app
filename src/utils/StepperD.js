// src/utils/validaciones.js

export const validarPaso1 = (nombre, apellidos, genero, telefono, campoEspecifico = null) => {
    const errores = {};
  
    // Validar solo el campo específico si se proporciona, o todos los campos si no se proporciona uno específico
    if (!campoEspecifico || campoEspecifico === 'nombre') {
      if (!nombre) {
        errores.nombre = 'El nombre es obligatorio';
      } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        errores.nombre = 'El nombre solo debe contener letras';
      } else if (nombre.length < 4) {
        errores.nombre = 'El nombre debe contener por lo menos 4 caracteres';
      } else if (nombre.length >= 30) {
        errores.nombre = 'El nombre no debe exceder los 30 caracteres';
      }
    }
  
    if (!campoEspecifico || campoEspecifico === 'apellidos') {
      if (!apellidos) {
        errores.apellidos = 'Los apellidos son obligatorios';
      } else if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
        errores.apellidos = 'Los apellidos solo deben contener letras';
      }
    }
  
    if (!campoEspecifico || campoEspecifico === 'genero') {
      if (!genero) {
        errores.genero = 'El género es obligatorio';
      }
    }
  
    if (!campoEspecifico || campoEspecifico === 'telefono') {
      if (!telefono) {
        errores.telefono = 'El teléfono es obligatorio';
      } else if (!/^\d{10}$/.test(telefono)) {
        errores.telefono = 'El teléfono debe tener 10 dígitos';
      }
    }
  
    return errores;
};
  
export const validarPaso2 = (licenciatura, cedulaProfesional, especialidad, cedulaEspecialidad) => {
    const errores = {};
  
    // Validación de licenciatura
    if (!licenciatura) {
        errores.licenciatura = 'La licenciatura es obligatoria';
    } else if (!/^[a-zA-Z\s]+$/.test(licenciatura)) {
        errores.licenciatura = 'La licenciatura solo debe contener letras';
    }
  
    // Validación de cédula profesional
    if (!cedulaProfesional) {
        errores.cedulaProfesional = 'La cédula profesional es obligatoria';
    } else if (!/^\d{8}$/.test(cedulaProfesional)) {
        errores.cedulaProfesional = 'La cédula profesional debe tener 8 dígitos';
    }
  
    // Validación de especialidad
    if (!especialidad) {
        errores.especialidad = 'La especialidad es obligatoria';
    } else if (!/^[a-zA-Z\s]+$/.test(especialidad)) {
        errores.especialidad = 'La especialidad solo debe contener letras';
    }
  
    // Validación de cédula de especialidad (opcional)
    if (cedulaEspecialidad && !/^\d{8}$/.test(cedulaEspecialidad)) {
        errores.cedulaEspecialidad = 'La cédula de especialidad debe tener 8 dígitos si se proporciona';
    }
  
    return errores;
};
  
  
export const validarPaso3 = (nombreConsultorio, direccion, archivoAutorizacion) => {
    const errores = {};
  
    // Validación de nombre del consultorio
    if (!nombreConsultorio) {
        errores.nombreConsultorio = 'El nombre del consultorio es obligatorio';
    } else if (!/^[a-zA-Z\s]+$/.test(nombreConsultorio)) {
        errores.nombreConsultorio = 'El nombre del consultorio solo debe contener letras y espacios';
    }
  
    // Validación de dirección del consultorio
    if (!direccion) {
        errores.direccion = 'La dirección del consultorio es obligatoria';
    }
  
    // Validación de archivo de autorización
    if (!archivoAutorizacion) {
        errores.archivoAutorizacion = 'Debe seleccionar un archivo de autorización';
    }
  
    return errores;
  };
  
  