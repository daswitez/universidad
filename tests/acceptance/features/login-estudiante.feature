# language: es
Característica: Autenticación de estudiante
  Esquema del escenario: Login exitoso
    Dado que existe un estudiante con correo "<email>" y contraseña "123456"
    Cuando envío una petición POST a "/auth/login-estudiante" con esas credenciales
    Entonces la respuesta debe tener código 200
    Y el cuerpo debe incluir el campo "id_estudiante"

    Ejemplos:
      | email |
      | <rand> |
