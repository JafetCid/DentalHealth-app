// src/utils/validaciones.js  
//Validaciones del login
export const validateLogin = (email, password) => {
  const errores = {};

  // Validar el formato del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errores.email = "El correo es obligatorio.";
  } else if (!emailRegex.test(email)) {
    errores.email = "El formato del correo no es válido.";
  }

  // Validar contraseña
  if (!password) {
    errores.password = "La contraseña es obligatoria.";
  } else if (password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  return errores;
};

// Validacion del stepDentista
export const validarPaso1 = (nombre, apellidos, genero, telefono, dateOfBirth, campoEspecifico = null) => {
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

  // Validación del campo de fecha de nacimiento
if (!campoEspecifico || campoEspecifico === 'dateOfBirth') {
  if (!dateOfBirth) {
    errores.dateOfBirth = 'La fecha de nacimiento es obligatoria';
  } else {
    const dateParts = dateOfBirth.split("-");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // El mes es 0-indexed en JavaScript.
    const year = parseInt(dateParts[2]);

    const inputDate = new Date(year, month, day);
    const today = new Date();

    // Calcular la fecha mínima permitida (100 años atrás desde hoy)
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    // Validación: La fecha no puede ser futura
    if (inputDate > today) {
      errores.dateOfBirth = 'La fecha de nacimiento no puede ser futura';
    } else if (inputDate < minDate) {
    errores.dateOfBirth = 'La fecha de nacimiento no puede ser más antigua de 100 años';
  }

    // Validación: La fecha debe ser válida
    if (isNaN(inputDate.getTime())) {
      errores.dateOfBirth = 'La fecha ingresada no es válida';
    }
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
  
//Validacion del stepPaciente
export const validarPaso1P = (nombre, apellidos, genero, dateOfBirth, telefono) => {
  const errores = {};

  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    errores.nombre = 'El nombre solo debe contener letras';
  } else if (nombre.length < 4) {
    errores.nombre = 'El nombre debe contener por lo menos 4 caracteres';
  } else if (nombre.length >= 30) {
    errores.nombre = 'El nombre no debe exceder los 30 caracteres';
  } else if (/\d/.test(nombre)) errores.nombre = 'El nombre no puede contener números.';
  
  if (!apellidos) {
    errores.apellidos = 'Los apellidos son obligatorios';
  } else if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
    errores.apellidos = 'Los apellidos solo deben contener letras';
  }
  
  if (!genero) errores.genero = 'El género es obligatorio.';

  if (!dateOfBirth) {
    errores.dateOfBirth = 'La fecha de nacimiento es obligatoria';
  } else {
    const dateParts = dateOfBirth.split("-");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // El mes es 0-indexed en JavaScript.
    const year = parseInt(dateParts[2]);

    const inputDate = new Date(year, month, day);
    const today = new Date();

    // Calcular la fecha mínima permitida (100 años atrás desde hoy)
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    // Validación: La fecha no puede ser futura
    if (inputDate > today) {
      errores.dateOfBirth = 'La fecha de nacimiento no puede ser futura';
    } else if (inputDate < minDate) {
    errores.dateOfBirth = 'La fecha de nacimiento no puede ser más antigua de 100 años';
  }

    // Validación: La fecha debe ser válida
    if (isNaN(inputDate.getTime())) {
      errores.dateOfBirth = 'La fecha ingresada no es válida';
    }
  }
  
  if (!telefono) {
    errores.telefono = 'El teléfono es obligatorio';
  } else if (!/^\d{10}$/.test(telefono)) {
    errores.telefono = 'El teléfono debe tener solo 10 dígitos';
  }
  return errores;
};

export const validarPaso2P = ( direccion, procedencia, correo, password, confirmPassword) => {
  const errores = {};
  if (!direccion) {
    errores.direccion = 'La dirección es obligatoria.';
  } else if (direccion.length < 5) {
    errores.direccion = 'La dirección debe tener al menos 5 caracteres.';
  } else if (direccion.length > 100) {
    errores.direccion = 'La dirección no puede superar los 100 caracteres.';
  }
  const regex = /^[a-zA-Z0-9\s,.#-]+$/; // Permite letras, números, espacios y caracteres básicos de direcciones
  if (!regex.test(direccion)) {
      return 'La dirección contiene caracteres inválidos.';
  }

  if (!procedencia) {
    errores.procedencia = 'La procedencia es obligatoria';
  }

  if (!correo){
    errores.correo = 'El correo electrónico es obligatorio.';
  } 
  // else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
  //   errores.correo = 'El correo electrónico es inválido.';
  // }
  

  if (!password) errores.password = 'La contraseña es obligatoria.';
  else if (password.length < 6) errores.password = 'La contraseña debe tener al menos 6 caracteres.';

  if (password !== confirmPassword) errores.confirmPassword = 'Las contraseñas no coinciden.';
  return errores;
};