# language: es
Característica: Autenticación de docente
  Esquema del escenario: Login exitoso
    Dado que existe un docente con correo "<email>" y contraseña "123456"
    Cuando envío una petición POST a "/auth/login" con esas credenciales
    Entonces la respuesta debe tener código 200
    Y el cuerpo debe incluir el campo "id_docente"

    Ejemplos:
      | email |
      | <rand> |
