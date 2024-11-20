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
export const validarPaso1 = (
  nombre, 
  apellidos, 
  genero, 
  dateOfBirth,  
  telefono,
  email,
  password,
  confirmPassword,
  profilePicture
) => {
  const errores = {};

  // Validar solo el campo específico si se proporciona, o todos los campos si no se proporciona uno específico
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (nombre.length < 4) {
    errores.nombre = 'El nombre debe contener por lo menos 4 caracteres';
  } else if (nombre.length >= 30) {
    errores.nombre = 'El nombre no debe exceder los 30 caracteres';
  }

  if (!apellidos) {
    errores.apellidos = 'Los apellidos son obligatorios';
  } else if (apellidos.length < 8) {
    errores.apellidos = 'Los apellidos deben contener por lo menos 8 caracteres';
  } 

  if (!genero) {
    errores.genero = 'El género es obligatorio';
  }
  

  if (!telefono) {
    errores.telefono = 'El teléfono es obligatorio';
  } else if (!/^\d{10}$/.test(telefono)) {
    errores.telefono = 'El teléfono debe tener 10 dígitos';
  }

  // Validación del campo de fecha de nacimiento
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

    if (!email){
      errores.email = 'El correo electrónico es obligatorio.';
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errores.email = 'El correo electrónico es inválido.';
    }
    
  
    if (!password) errores.password = 'La contraseña es obligatoria.';
    else if (password.length < 6) errores.password = 'La contraseña debe tener al menos 6 caracteres.';
  
    if (password !== confirmPassword) errores.confirmPassword = 'Las contraseñas no coinciden.';
  }

return errores;
};

export const validarPaso2 = (licenciatura, cedulaProfesional, especialidad, cedulaEspecialidad) => {
  const errores = {};

  // Validación de licenciatura
  if (!licenciatura) {
      errores.licenciatura = 'La licenciatura es obligatoria';
  } else if (licenciatura.length < 10) {
    errores.licenciatura = 'La licenciatura debe de tener mas de 10 caracteres';
  }

  // Validación de cédula profesional
  if (!cedulaProfesional) {
      errores.cedulaProfesional = 'La cédula profesional es obligatoria';
  } 

  // Validación de especialidad
  if (!especialidad) {
    errores.especialidad = 'La especialidad es obligatoria';
  } else if (especialidad.length < 10) {
    errores.especialidad = 'La especialidad debe de tener mas de 10 caracteres';
  }

  // Validación de cédula de especialidad (opcional)
  if (cedulaEspecialidad && !/^\d{8}$/.test(cedulaEspecialidad)) {
      errores.cedulaEspecialidad = 'La cédula de especialidad debe tener 8 dígitos si se proporciona';
  }

  return errores;
};

export const validarPaso3 = (nombreConsultorio, direccion, archivoAutorizacion, clinicLogo) => {
  const errores = {};

  // Validación de nombre del consultorio
  if (!nombreConsultorio) {
      errores.nombreConsultorio = 'El nombre del consultorio es obligatorio';
  } else if (!/^[a-zA-Z\s]+$/.test(nombreConsultorio)) {
      errores.nombreConsultorio = 'El nombre del consultorio solo debe contener letras y espacios';
  } else if (nombreConsultorio.length < 5) {
    errores.nombreConsultorio = 'El nombre del consultorio debe tener mas de 5 caracteres';
  }

  // Validación de dirección del consultorio
  if (!direccion) {
      errores.direccion = 'La dirección del consultorio es obligatoria';
  } else if (direccion.length < 15) {
    errores.direccion = 'La dirección no puede tener menos de 15 caracteres';
  }

  // Validación de archivo de autorización
  // if (!archivoAutorizacion) {
  //     errores.archivoAutorizacion = 'Debe seleccionar un archivo de autorización';
  // }

  return errores;
};
  

//Validacion del stepPaciente
export const validarPaso1P = (nombre, apellidos, genero, dateOfBirth, telefono) => {
  const errores = {};

  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (nombre.length < 4) {
    errores.nombre = 'El nombre debe contener por lo menos 4 caracteres';
  }

  if (!apellidos) {
    errores.apellidos = 'Los apellidos son obligatorios';
  } else if (apellidos.length < 8) {
    errores.apellidos = 'Los apellidos deben contener por lo menos 8 caracteres';
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

export const validarPaso2P = ( direccion, procedencia, email, password, confirmPassword) => {
   
  const errores = {};

  if (!direccion) {
    errores.direccion = 'La dirección del consultorio es obligatoria';
  } else if (direccion.length < 15) {
    errores.direccion = 'La dirección no puede tener menos de 15 caracteres';
  }

  if (!procedencia) {
    errores.procedencia = 'La procedencia es obligatoria';
  } else if (procedencia.length < 8 ) {
    errores.procedencia = 'La procedencia debe tener al menos 8 carecteres.';
  } 

  if (!email){
    errores.email = 'El correo electrónico es obligatorio.';
  } 
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'El correo electrónico es inválido.';
  }
  

  if (!password) errores.password = 'La contraseña es obligatoria.';
  else if (password.length < 6) errores.password = 'La contraseña debe tener al menos 6 caracteres.';

  if (password !== confirmPassword) errores.confirmPassword = 'Las contraseñas no coinciden.';

  return errores;
};


//Validacion Formulario Crear Expediente
export const validarFormCE = (peso, talla, ta, fc, fr, t, motivoC, medidaH, salud, padecimientoA, tratamientoM, medicamentoDroga, alergico, hospitalizado) => {
  
  const errores = {}

  if (!peso) {
    errores.peso = 'Peso es obligatorio';
  } else if (!peso || isNaN(peso) || peso < 20 || peso > 120) {
    errores.peso = 'La peso debe estar entre 20 y 120 kg';
  }

  if (!talla) {
    errores.talla = 'Talla es obligatoria';
  } else if (!talla || isNaN(talla) || talla < 50 || talla > 250) {
    errores.talla = 'La talla debe estar entre 50 y 250 cm';
  }

  const taRegex = /^\d{2,3}\/\d{2,3}$/; // Formato como "120/80"
  if (!ta) {
    errores.ta = 'T.A es obligatoria';
  } else if (!ta || !taRegex.test(ta)) {
      errores.ta = 'T.A. debe estar en formato "120/80';
  }

  if (!fc) {
    errores.fc = 'F.C es obligatoria';
  } else if (!fc || isNaN(fc) || fc < 40 || fc > 200) {
    errores.fc = 'F.C. debe estar entre 40 y 200 lpm';
  }

  if (!fr) {
    errores.fr = 'F.R es obligatoria';
  } else if (!fr || isNaN(fr) || fr < 8 || fr > 40) {
    errores.fr = 'F.R. debe estar entre 8 y 40 respiraciones por minuto.';
  }
  if (!t) {
    errores.t = 'T es obligatoria';
  } else if (!t || isNaN(t) || t < 35 || t > 42) {
    errores.t = 'La T debe estar entre 35°C y 42°C.';
  }

  if (!motivoC) {
    errores.motivoC = 'Este campo es obligatorio';
  } else if (motivoC.length < 10) {
    errores.motivoC = 'El campo debe contener por lo menos 10 caracteres';
  }

  if (!medidaH) {
    errores.medidaH = 'Este campo es obligatorio';
  } else if (medidaH.length < 10) {
    errores.medidaH = 'El campo debe contener por lo menos 10 caracteres';
  }

  if (!salud) {
    errores.salud = 'Este campo es obligatorio';
  } else if (salud.length < 3) {
    errores.salud = 'El campo debe contener por lo menos 3 caracteres';
  }

  if (!padecimientoA) {
    errores.padecimientoA = 'Este campo es obligatorio';
  } else if (padecimientoA.length < 5) {
    errores.padecimientoA = 'El campo debe contener por lo menos 5 caracteres';
  }

  if (!tratamientoM) {
    errores.tratamientoM = 'Este campo es obligatorio';
  } else if (tratamientoM.length < 2) {
    errores.tratamientoM = 'El campo debe contener por lo menos 2 caracteres';
  }

  if (!medicamentoDroga) {
    errores.medicamentoDroga = 'Este campo es obligatorio';
  } else if (medicamentoDroga.length < 2) {
    errores.medicamentoDroga = 'El campo debe contener por lo menos 2 caracteres';
  }

  if (!alergico) {
    errores.alergico = 'Este campo es obligatorio';
  }  else if (alergico.length < 2) {
    errores.alergico = 'El campo debe contener por lo menos 2 caracteres';
  }

  if (!hospitalizado) {
    errores.hospitalizado = 'Este campo es obligatorio';
  } else if (hospitalizado.length < 2) {
    errores.hospitalizado = 'El campo debe contener por lo menos 2 caracteres';
  }
  
  return errores;
}
